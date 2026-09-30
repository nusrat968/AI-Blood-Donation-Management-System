// ai/utils/scoreDonors.js
//
// Deterministic (rule-based) donor scoring. It runs BEFORE Gemini:
//   1. shortlists the best candidates so we send fewer donors to the AI
//   2. provides a fallback ranking when Gemini fails or returns bad data
//
// NOTE: Medical blood-group compatibility is NOT decided here. The donors
// passed in must already be filtered by the app's compatibility rules.

const MIN_DONATION_GAP_DAYS = 90;   // adjust to match your app's eligibility rule
const FULL_RECOVERY_DAYS = 180;     // after this many days the recency score is maxed

const WEIGHTS = {
  district: 40,
  availability: 20,
  recency: 25,
  reliability: 15,
};

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function daysSince(dateValue, now = new Date()) {
  if (!dateValue) return null;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.floor((now - date) / 86400000));
}

/**
 * Scores one donor from 0 to 100.
 * Optional donor.responseRate (0..1) = share of past requests the donor accepted.
 */
function scoreDonor(donor, request, now = new Date()) {
  let score = 0;
  const reasons = [];

  // District match
  const donorDistrict = normalizeText(donor.district);
  if (donorDistrict && donorDistrict === normalizeText(request.district)) {
    score += WEIGHTS.district;
    reasons.push(`same district (${donor.district})`);
  } else {
    reasons.push(`different district (${donor.district || "unknown"})`);
  }

  // Availability
  const isAvailable = donor.isAvailable === true || donor.isAvailable === "true";
  if (isAvailable) {
    score += WEIGHTS.availability;
    reasons.push("marked available");
  }

  // Donation recency
  const days = daysSince(donor.lastDonationDate, now);
  if (days === null) {
    score += WEIGHTS.recency;
    reasons.push("no previous donation recorded");
  } else if (days < MIN_DONATION_GAP_DAYS) {
    reasons.push(`donated only ${days} days ago`);
  } else {
    const ratio = Math.min(1, (days - MIN_DONATION_GAP_DAYS) / (FULL_RECOVERY_DAYS - MIN_DONATION_GAP_DAYS));
    score += Math.round(15 + (WEIGHTS.recency - 15) * ratio);
    reasons.push(`last donated ${days} days ago`);
  }

  // Reliability (past response rate); neutral 0.5 when unknown
  if (typeof donor.responseRate === "number") {
    const rate = Math.min(1, Math.max(0, donor.responseRate));
    score += Math.round(WEIGHTS.reliability * rate);
    reasons.push(`${Math.round(rate * 100)}% past response rate`);
  } else {
    score += Math.round(WEIGHTS.reliability * 0.5);
  }

  return { score, daysSinceDonation: days, reasons };
}

/**
 * Returns donors sorted by score (best first), each with score details attached.
 */
function rankDonors(donors, request, now = new Date()) {
  return donors
    .map((donor) => {
      const { score, daysSinceDonation, reasons } = scoreDonor(donor, request, now);
      return { ...donor, score, daysSinceDonation, scoreReasons: reasons };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tie-break: donor who rested longer comes first
      return (b.daysSinceDonation ?? Infinity) - (a.daysSinceDonation ?? Infinity);
    });
}

/**
 * Builds the response shape used by the app from the rule-based ranking only.
 */
function buildFallbackMatches(rankedDonors, limit = 3) {
  const matches = rankedDonors.slice(0, limit).map((d) => ({
    donorId: d.donorId,
    name: d.name,
    bloodGroup: d.bloodGroup,
    district: d.district,
    reason: d.scoreReasons.slice(0, 3).join(", "),
  }));

  return {
    matches,
    note: matches.length
      ? "AI ranking was unavailable, so donors were ranked using rule-based scoring."
      : "No suitable donors found.",
  };
}

module.exports = {
  scoreDonor,
  rankDonors,
  buildFallbackMatches,
  MIN_DONATION_GAP_DAYS,
};