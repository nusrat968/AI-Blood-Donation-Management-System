# AI Integration – Blood Donation Management System

## Overview

The AI Integration module helps identify and recommend suitable blood donors based on blood group, district, availability, and request urgency.

If the AI service is unavailable, the system uses a basic rule-based matching mechanism as a fallback.

## Objectives

- Find suitable donors for blood requests.
- Check blood group compatibility.
- Consider donor district and availability.
- Prioritize urgent requests.
- Return structured AI responses.
- Handle AI failures without breaking the system.

## AI Matching Criteria

| Criteria | Description |
|---|---|
| Blood Group | Checks blood group compatibility. |
| District | Prioritizes donors from the same or nearby district. |
| Availability | Considers only available donors. |
| Urgency | Gives higher priority to critical requests. |

## Prompt Engineering

The AI is instructed to analyze donor and blood request data and recommend the most suitable donors.

It must:
- Use only the provided donor information.
- Never invent donor details.
- Return a structured JSON response.
- Clearly state when no suitable match is found.

### Response Format

```json
{
  "matches": [
    {
      "name": "Donor Name",
      "bloodGroup": "O+",
      "district": "Khulna",
      "reason": "Reason for matching"
    }
  ],
  "note": "Matching result summary"
}
