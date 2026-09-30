// ai/services/geminiService.js

const { SYSTEM_PROMPT, MATCH_SCHEMA, buildUserPrompt } = require("../prompts/donorMatchPrompt");
const { CHAT_SYSTEM_PROMPT, CHAT_SCHEMA, buildChatContents } = require("../prompts/chatPrompt");
const { rankDonors, buildFallbackMatches } = require("../utils/scoreDonors");
const { validateAIResponse, validateChatResponse } = require("../utils/validateAIResponse");

// NOTE: Gemini 1.x and 2.x models are blocked for newly created API keys/projects.
// New keys only work with 3.x generation models. Override with GEMINI_MODEL in .env if needed.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const REQUEST_TIMEOUT_MS = 15000;
const MAX_ATTEMPTS = 2; // one retry for timeouts, network errors and 5xx
const RETRY_DELAY_MS = 500;
const SHORTLIST_SIZE = 10;
const TOP_MATCHES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One attempt to call Gemini. `retryable` tells the wrapper whether trying again makes sense.
 */
async function attemptGemini({ contents, systemInstruction, responseSchema, temperature }) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Gemini config error: GEMINI_API_KEY is missing. Check backend/.env and restart the server.");
    return { success: false, error: "CONFIG_ERROR", message: "AI service is not configured.", retryable: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Key goes in a header so it never appears in URLs or logs
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature,
          responseMimeType: "application/json",
          responseSchema,
        },
      }),
    });

    clearTimeout(timeout);

    if (response.status === 429) {
      console.error("Gemini rate limit / quota exceeded (429).");
      return { success: false, error: "RATE_LIMIT", message: "AI service is busy. Please try again shortly.", retryable: false };
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API error response:", response.status, errorBody);
      return {
        success: false,
        error: "API_ERROR",
        message: `AI service returned status ${response.status}`,
        retryable: response.status >= 500,
      };
    }

    const data = await response.json();

    // Join all non-"thought" text parts (some models return several parts)
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const rawText = parts
      .filter((p) => typeof p.text === "string" && !p.thought)
      .map((p) => p.text)
      .join("");

    if (!rawText) {
      console.error("Gemini returned no text. Full response:", JSON.stringify(data));
      return { success: false, error: "EMPTY_RESPONSE", message: "AI returned no content.", retryable: false };
    }

    return { success: true, rawText };
  } catch (err) {
    clearTimeout(timeout);

    if (err.name === "AbortError") {
      console.error(`Gemini request timed out after ${REQUEST_TIMEOUT_MS}ms.`);
      return { success: false, error: "TIMEOUT", message: "AI request timed out.", retryable: true };
    }

    console.error("Gemini network error:", err.message);
    return { success: false, error: "NETWORK_ERROR", message: "Could not reach AI service.", retryable: true };
  }
}

/**
 * Calls Gemini with a small retry for temporary failures.
 */
async function callGemini({ contents, systemInstruction, responseSchema, temperature = 0.2 }) {
  let result;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    result = await attemptGemini({ contents, systemInstruction, responseSchema, temperature });
    if (result.success || !result.retryable) break;
    if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS);
  }

  const { retryable, ...clean } = result;
  return clean;
}

function callGeminiForMatches(requestData, shortlist) {
  return callGemini({
    systemInstruction: SYSTEM_PROMPT,
    contents: [{ role: "user", parts: [{ text: buildUserPrompt(requestData, shortlist, TOP_MATCHES) }] }],
    responseSchema: MATCH_SCHEMA,
  });
}

/**
 * MAIN ENTRY POINT for donor recommendation.
 * Flow: rule-based scoring -> shortlist -> Gemini re-rank -> validate against
 * our own donor list -> fall back to rule-based ranking if AI fails.
 *
 * `eligibleDonors` must already be filtered by the app's medical compatibility rules.
 * Returns { success: true, source: "ai" | "fallback" | "none", data: { matches, note } }
 */
async function recommendDonors(requestData, eligibleDonors) {
  if (!Array.isArray(eligibleDonors) || eligibleDonors.length === 0) {
    return { success: true, source: "none", data: { matches: [], note: "No eligible donors found." } };
  }

  const ranked = rankDonors(eligibleDonors, requestData);
  const shortlist = ranked.slice(0, SHORTLIST_SIZE);

  const aiResult = await callGeminiForMatches(requestData, shortlist);

  if (aiResult.success) {
    const validated = validateAIResponse(aiResult.rawText, shortlist, { limit: TOP_MATCHES });
    if (validated.valid && validated.data.matches.length > 0) {
      return { success: true, source: "ai", data: validated.data };
    }
    console.warn("AI donor ranking rejected:", validated.error || "empty matches");
  }

  // AI failed or returned unusable data: rule-based ranking still gives a result
  return {
    success: true,
    source: "fallback",
    data: buildFallbackMatches(shortlist, TOP_MATCHES),
    aiError: aiResult.success ? "INVALID_AI_RESPONSE" : aiResult.error,
  };
}

/**
 * Older API: shortlists donors and returns the raw Gemini text.
 * Prefer recommendDonors(), which also validates and falls back.
 */
async function getDonorMatches(requestData, availableDonors) {
  const shortlist = rankDonors(availableDonors, requestData).slice(0, SHORTLIST_SIZE);
  return callGeminiForMatches(requestData, shortlist);
}

/**
 * One chatbot turn: classifies intent and extracts bloodGroup / district / urgency.
 * Returns { success, rawText, data } where `data` is the validated, normalized result
 * (or undefined if validation failed; `validationError` explains why).
 */
async function getChatIntent(userMessage, history = []) {
  console.log("getChatIntent called:", userMessage);
  const result = await callGemini({
    systemInstruction: CHAT_SYSTEM_PROMPT,
    contents: buildChatContents(userMessage, history),
    responseSchema: CHAT_SCHEMA,
    temperature: 0.4,
  });

  if (!result.success) return result;

  const validated = validateChatResponse(result.rawText);
  if (!validated.valid) {
    console.error("Chat response validation failed:", validated.error, "| raw:", result.rawText);
    return { ...result, validationError: validated.error };
  }

  return { ...result, data: validated.data };
}

module.exports = { recommendDonors, getDonorMatches, getChatIntent };
