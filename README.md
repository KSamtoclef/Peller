# Peller Frontend Reconstruction Preview

Static HTML/CSS/JavaScript reconstruction created from the supplied HTML source.

## Important preview behavior

- All external advertising, affiliate, tracking, WhatsApp, Blogger, recommendation and redirect destinations are disabled.
- The mobile-number value is used only in memory to display the next screen and is not transmitted or permanently stored.
- Share progress is simulated locally and stored only in `localStorage` under `peller-preview-share-progress`.
- The original Back-button/hash advertising redirect is disabled.
- Third-party verification scripts, counters and tracking widgets are not loaded.

## Local preview

Open `index.html` directly or serve the repository with any static web server.

## Vercel

Import this repository in Vercel, select **Other** as the framework preset, leave the build command empty and deploy from the repository root.
