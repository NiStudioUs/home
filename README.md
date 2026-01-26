# Portfolio App Configuration

This app loads its content dynamically from `assets/data.json`.

## JSON Schema

The `data.json` file must follow this structure. You can use this schema to generate new app entries.

```json
{
  "developer": {
    "name": "Your Name",
    "bio": "Your Bio",
    "role": "Your Role",
    "avatarUrl": "URL or assets/images/...",
    "email": "you@example.com",
    "socialLinks": [
      {
        "platform": "GitHub",
        "url": "...",
        "icon": "github"
      }
    ]
  },
  "apps": [
    {
      "id": "unique_app_id",
      "name": "App Name",
      "shortDescription": "One line summary",
      "fullDescription": "Detailed markdown-supported description",
      "iconUrl": "assets/images/icon.png",
      "descriptionImages": [
          { "url": "assets/images/desc1.png", "caption": "Optional Caption" }
      ],
      "links": [
        { "type": "Play Store", "url": "..." },
        { "type": "Website", "url": "..." }
      ],
      "privacyPolicy": {
        "url": "https://example.com/privacy",
        "features": [] 
      },
      "termsAndConditions": {
        "url": "https://example.com/terms",
        "features": []
      }
    }
  ]
}
```

## AI Generation Prompt

To generate a new app entry, copy and paste the following prompt into an AI chat (like ChatGPT or Gemini), replacing the placeholders with your app's info:

> I need to generate a JSON entry for my portfolio website. Here is the info about my app:
>
> **App Name**: [Name]
> **Description**: [Description]
> **Key Features**: [List features]
> **Tech Stack**: [List technologies used]
>
> Please generate a JSON object matching the following schema. ensuring `features`, `technicalDetails`, `privacyPolicy`, and `termsAndConditions` follow the structured format (with sections).
> *   All text fields support **Markdown** formatting.
> *   You can specify `"imageRenderer": "list"`, `"grid"`, or `"default"` (carousel) for each section.
>
> **Schema Reference**:
> ```json
> {
>   "id": "app_slug",
>   "name": "Name",
>   "shortDescription": "...",
>   "fullDescription": "...",
>   "iconUrl": "...",
>   "descriptionImages": [],
>   "features": [ { "title": "...", "subtitle": "...", "websiteUrl": "...", "hide": false, "last_updated_utc": "2024-01-01", "sections": [ { "title": "...", "content": "...", "websiteUrl": "...", "hide": false, "last_updated_utc": "...", "imageRenderer": "default", "images": [] } ] } ],
  "technicalDetails": [ { "title": "...", "subtitle": "...", "websiteUrl": "...", "hide": false, "last_updated_utc": "...", "sections": [ { "title": "...", "content": "...", "websiteUrl": "...", "hide": false, "last_updated_utc": "...", "imageRenderer": "default", "images": [] } ] } ],
>   "screenshots": [],
>   "links": [],
  "privacyPolicy": { "url": "...", "features": [] },
  "termsAndConditions": { "url": "...", "features": [] }
> }
> ```
