# Evidence Daily Daily Data Files

Each file is named `YYYY-MM-DD.json` and contains all entries for that UTC day.

Schema (simplified):

{
  "date": "YYYY-MM-DD",
  "updated": "ISO8601",
  "entries": [
    {
      "id": "unique-id",
      "type": "space-weather" | "earthquake",
      "time_utc": "ISO8601",
      "title": { "en": "...", "zh": "..." },
      "summary": { "en": "...", "zh": "..." },
      "data": { ... },
      "evidence": {
        "source_name": "...",
        "source_url": "...",
        "method": "...",
        "limitations": "..."
      },
      "visual": {
        "type": "bar",
        "value": number,
        "min": number,
        "max": number,
        "label": "optional"
      }
    }
  ]
}

Homepage loads the most recent 14 days from this folder.
