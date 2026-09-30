// ai/utils/validateAIResponse.js

const VALID_BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const VALID_URGENCY = ["normal", "urgent", "critical", "emergency"];
const MAX_REASON_LENGTH = 200;

/**
 * Strips markdown code fences and parses JSON safely.
 */
function parseJson(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return { ok: false, error: "EMPTY_RESPONSE" };
  }

  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    return { ok: true, value: JSON.parse(cleaned) };
  } catch (err) {
    return { ok: false, error: "INVALID_FORMAT" };
  }
}

/**
 * Validates the donor-matching response from Gemini.
 *
 * If `eligibleDonors` is provided, every donorId returned by the AI is checked
 * against that list. Unknown IDs are dropped, duplicates are removed, and the
 * name / bloodGroup / district are taken from OUR data (never from the AI),
 * so the AI cannot inject or alter donor details.
 */
function validateAIResponse(rawText, eligibleDonors = null, { limit = 3 } = {}) {
  const parsedResult = parseJson(rawText);
  if (!parsedResult.ok) {
    return { valid: false, error: parsedResult.error };
  }

  const parsed = parsedResult.value;

  if (!parsed || !Array.isArray(parsed.matches)) {
    return { valid: false, error: "MISSING_MATCHES" };
  }

  if (parsed.matches.length === 0) {
    return { valid: true, data: { matches: [], note: parsed.note || "No suitable donors found." } };
  }

  const donorById = Array.isArray(eligibleDonors)
    ? new Map(eligibleDonors.map((d) => [String(d.donorId), d]))
    : null;

  const seen = new Set();
  const cleanMatches = [];

  for (const m of parsed.matches) {
    if (!m || typeof m !== "object") continue;

    const reason = typeof m.reason === "string" ? m.reason.trim().slice(0, MAX_REASON_LENGTH) : "";

    if (donorById) {
      // Strict mode: only donors from our eligible list are accepted
      const key = String(m.donorId);
      const donor = donorById.get(key);
      if (!donor || seen.has(key)) continue;
      seen.add(key);

      cleanMatches.push({
        donorId: donor.donorId,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        district: donor.district,
        reason,
      });
    } else {
      // Legacy mode: no donor list available, only remove duplicates
      const key = m.donorId !== undefined ? String(m.donorId) : `${m.name}-${m.bloodGroup}`;
      if (seen.has(key)) continue;
      seen.add(key);
      cleanMatches.push({ ...m, reason });
    }
  }

  if (donorById && cleanMatches.length === 0) {
    return { valid: false, error: "NO_VALID_MATCHES" };
  }

  return {
    valid: true,
    data: { matches: cleanMatches.slice(0, limit), note: typeof parsed.note === "string" ? parsed.note : "" },
  };
}

/**
 * Validates and normalizes one chatbot turn from Gemini.
 * Always returns safe values: unknown intent becomes "general",
 * invalid blood group / urgency become null.
 */
function validateChatResponse(rawText) {
  const parsedResult = parseJson(rawText);
  if (!parsedResult.ok) {
    return { valid: false, error: parsedResult.error };
  }

  const parsed = parsedResult.value;
  if (!parsed || typeof parsed !== "object") {
    return { valid: false, error: "INVALID_FORMAT" };
  }

  const reply = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
  if (!reply) {
    return { valid: false, error: "MISSING_REPLY" };
  }

  const bloodGroup = typeof parsed.bloodGroup === "string" ? parsed.bloodGroup.trim().toUpperCase() : null;
  const district = typeof parsed.district === "string" && parsed.district.trim() ? parsed.district.trim() : null;
  const urgency = typeof parsed.urgency === "string" ? parsed.urgency.trim().toLowerCase() : null;

  return {
    valid: true,
    data: {
      intent: parsed.intent === "donor_search" ? "donor_search" : "general",
      reply,
      bloodGroup: VALID_BLOOD_GROUPS.includes(bloodGroup) ? bloodGroup : null,
      district,
      urgency: VALID_URGENCY.includes(urgency) ? urgency : null,
    },
  };
}

module.exports = { validateAIResponse, validateChatResponse };
