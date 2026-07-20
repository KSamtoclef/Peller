# Peller Frontend Reconstruction Preview

Static HTML/CSS/JavaScript reconstruction created from the supplied HTML source.

## Restored structure

- Original visible page flow, wording, counters, comments, progress stages and activation-button positions are retained.
- Original public reaction/profile image references are restored with local fallbacks.
- Google Fonts, Blogger profile metadata and the SuperCounters block are restored.
- WhatsApp message structure and share-progress logic are retained, but real contact distribution remains disabled in this preview.
- The mobile-number value is used only in memory and is not transmitted or permanently stored.
- Share progress is stored locally under `peller-preview-share-progress`.

## Editable URL placeholders

The removed direct destinations were not deleted from the code structure. Their slots now use:

- `PASTE_YOUR_AD_URL_HERE`
- `PASTE_BUSINESS_PLAN_URL_HERE`
- `PASTE_PAGE_RETURN_URL_HERE`

These placeholders appear in the final activation buttons and in `js/app.js` configuration values.

## Local preview

Open `index.html` directly or serve the repository with any static web server.

## Vercel

Import this repository in Vercel, select **Other** as the framework preset, leave the build command empty and deploy from the repository root.