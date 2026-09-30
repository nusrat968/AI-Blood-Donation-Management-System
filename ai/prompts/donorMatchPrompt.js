// ai/prompts/donorMatchPrompt.js

// Sent to Gemini as the systemInstruction.
const SYSTEM_PROMPT = `You are an AI assistant integrated into a Blood Donation Management System.
Your role is to re-rank a shortlist of already medically eligible donors for a blood request.
Blood group compatibility has already been checked by the application — do not judge it yourself.
Consider district match, donor availability, time since last donation, and request urgency.
Only use the data provided. Never invent donors or donor details.
The "preScore" is a rule-based score (0-100); use it as a strong hint, but you may reorder donors when urgency or other factors justify it.`;

// Gemini responseSchema: forces valid JSON in exactly this shape.
const MATCH_SCHEMA = {
  type: "OBJECT",
  properties: {
    matches: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          donorId: { type: "STRING" },
          reason: { type: "STRING" },
        },
        required: ["donorId", "reason"],
      },
    },
    note: { type: "STRING" },
  },
  required: ["matches"],
};

/**
 * Builds the user prompt from the blood request and the shortlisted donors.
 * Donor names and phone numbers are NOT sent to the AI (privacy) — only an ID
 * and the features needed for ranking.
 * @param {Object} bloodRequest - { bloodGroup, district, urgency }
 * @param {Array} shortlistedDonors - donors already scored by rankDonors()
 * @param {number} limit - how many donors to recommend
 */
function buildUserPrompt(bloodRequest, shortlistedDonors, limit = 3) {
  const { bloodGroup, district, urgency } = bloodRequest;

  const donorList = shortlistedDonors
    .map(
      (d) =>
        `donorId: ${d.donorId}, bloodGroup: ${d.bloodGroup}, district: ${d.district}, daysSinceLastDonation: ${d.daysSinceDonation ?? "none recorded"}, available: ${d.isAvailable}, preScore: ${d.score ?? "N/A"}`
    )
    .join("\n");

  return `A blood request needs the following:
- Required Blood Group: ${bloodGroup}
- District: ${district}
- Urgency Level: ${urgency || "normal"}

Shortlisted eligible donors:
${donorList}

Recommend the top ${limit} donors, best first.
- Return the exact "donorId" value given above; never invent or alter it.
- "reason" must be one short sentence (max 20 words) based only on the data above.
- If no donor is suitable, return an empty "matches" array and explain in "note".`;
}

module.exports = { SYSTEM_PROMPT, MATCH_SCHEMA, buildUserPrompt };
