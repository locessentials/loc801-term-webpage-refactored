# Loc801 Terminology Webpage Project (Refactored)

This repository contains a bilingual webpage about terminology and generative AI for localization practice. It is a refactored version of the [original project](https://github.com/locessentials/loc801-term-webpage-project) with improved code architecture and an additional page for a more complete localization experience.

## What Changed from the Original

This version refactors how translatable strings are handled in JavaScript. In the original version, quiz feedback text was hardcoded in English inside `terminology-quiz_en-US.js`. This meant that localizing the quiz required duplicating the entire JavaScript file (`terminology-quiz_es-MX.js`) and replacing the English strings with Spanish ones — mixing content with logic and creating unnecessary complexity in managing duplicate JS code.

In the refactored version, all translatable strings have been externalized into a JSON file (`strings_en-US.json`). The quiz JavaScript now loads the correct strings at runtime based on which language version of the page is active. This separation of content from code is a localization best practice that mirrors real-world i18n architecture.

### Why a Shared Utilities File Was Added

In the original version, each JavaScript file was independent:

- `language-switcher.js` contained its own `getCurrentLanguage()` function and only it needed language detection — its job was simply to figure out which page you were on and switch to the other.
- `terminology-quiz.js` had all its strings hardcoded in English, so it had no need for language detection at all. It was completely self-contained and monolingual.

With externalized strings, that independence breaks down:

- `language-switcher.js` still needs to detect the current language to navigate to the other version.
- `terminology-quiz.js` **now also needs** to detect the current language so it can load the correct JSON file.

Both files need the exact same logic, so that shared code now lives in `language-utils.js`. This file provides three functions used across the project:

- `getCurrentLanguage()` — determines the active language from the filename
- `getOtherLanguageFile()` — generates the filename for the alternate language version
- `loadLanguageStrings()` — fetches and returns the appropriate JSON strings file

### Additional Content Page

This repo also includes `GettingStartedwTermMgmt_en-US.html`, a lightly adapted version of the article "Getting Started with Terminology Management" by Alaina Brandt (originally published in The ATA Chronicle). A student requested the opportunity to translate this article, so it's included here as optional additional content for a more complete localization experience. This page has its own supplementary stylesheet (`term-mgmt-styles.css`) for page-specific components like the SVG semantic triangle and content tables.

To learn more about other aspects of this project (such as the `index.html` redirect page and GitHub Pages deployment), refer to the [original repository's README](https://github.com/locessentials/loc801-term-webpage-project).

## File Structure

```
loc801-term-webpage-refactored/
├── index.html                          # Landing page with language redirect (no changes needed)
├── TerminologyWebpage_en-US.html       # English source content (refactor from original)
├── TerminologyWebpage_es-MX.html       # Spanish localized content (refactor from original)
├── GettingStartedwTermMgmt_en-US.html  # English bonus article (new file provided in refactored repo - optional to translate)
├── GettingStartedwTermMgmt_es-MX.html  # Spanish bonus article (create from scratch - optional)
├── language-utils.js                   # NEW — shared language detection and string loading (new file provided in refactored repo)
├── language-switcher.js                # Language picker (refactor from original)
├── terminology-quiz.js                 # Quiz logic (refactor from original)
├── strings_en-US.json                  # NEW — English translatable strings (new file provided in refactored repo)
├── strings_es-MX.json                  # NEW — Spanish translatable strings (create from scratch using the strings from the terminology-quiz_es-MX.js file)
├── styles.css                          # Shared styles (no changes needed)
├── term-mgmt-styles.css                # Styles for terminology management page (new file provided in refactored repo - only needed if you add the GettingStartedwTermMgmt.html page to your repo)
├── SemanticTriangle_en-US.png          # Image (optional to translate)
├── MakingMeaning_Starbucks_en-US.png   # Image (new image provided in refactored repo - optional to translate along with the GettingStartedwTermMgmt.html page)
└── TermExtraction-Eng-SketchEngine.png # Image (new image provided in refactored repo - only needed if you add the GettingStartedwTermMgmt.html page to your repo)
```

### Script Loading Order

HTML pages must load scripts in this order because of dependencies:

1. `language-utils.js` — shared functions (no dependencies)
2. `language-switcher.js` — depends on `language-utils.js`
3. `terminology-quiz.js` — depends on `language-utils.js` (only on pages with a quiz)

## Assignment Instructions

### Your Task

Observe the changes between the original and refactored versions in [Commit f2ca340](https://github.com/locessentials/loc801-term-webpage-refactored/commit/f2ca340e3ed5ba7ff5c6ae0dfb6f19c442a8b959), then implement those changes into your own fork of the [original project](https://github.com/locessentials/loc801-term-webpage-project).

The core task: externalize hardcoded translatable strings from JavaScript into JSON files, and create a shared utilities file so both the language switcher and the quiz can detect the current language.

### What to Do

1. **Study the commit diff** to understand what changed and why
2. **Create `language-utils.js`** — shared functions extracted from the original `language-switcher.js`
3. **Refactor `language-switcher.js`** — remove the functions that moved to `language-utils.js`
4. **Refactor `terminology-quiz.js`** — replace hardcoded English strings with JSON loading
5. **Add `strings_en-US.json`** — externalized English strings for the quiz and switcher
6. **Create `strings_es-MX.json`** — translated Spanish strings
7. **Update both HTML files** to load scripts in the correct dependency order
8. **Optional:** Translate `GettingStartedwTermMgmt_en-US.html` and associated images for a more complete localization experience

### Required: Create `strings_es-MX.json`

In the refactored version, quiz feedback and language switcher messages are stored in JSON files. You need to create `strings_es-MX.json` by translating the contents of `strings_en-US.json`.

When translating the JSON file:

- **Translate**: All user-facing text (feedback messages, error messages, accessibility announcements)
- **Do NOT translate**: JSON keys, placeholder tokens like `{question}`, `{correct}`, `{total}`, or the `value` strings that match HTML radio button values (e.g., `"True"`, `"False"`, `"rendering of ideas"`)
- **Do translate the keys inside `incorrectFeedback`** that correspond to answer option values — these must match the (untranslated) `value` attributes in your HTML radio buttons

### Optional Bonus Elements

For extra practice, you may also translate:

6. **Bonus Article: GettingStartedwTermMgmt_es-MX.html**
   - Translate the full terminology management article
   - This page uses an SVG semantic triangle — translate the `data-i18n` text labels within the SVG
   - The page also includes a table and highlighted excerpt sections

7. **Image Content (MakingMeaning_Starbucks_en-US.png)**
   - Recreate the semantic triangle image with Spanish labels (for GettingStartedwTermMgmt)

## Additional Resources

- For the original version of this project (without externalized strings): [loc801-term-webpage-project](https://github.com/locessentials/loc801-term-webpage-project)
- For the full assignment page on the Loc801 course website: [https://loc801.locessentials.com/t-4/javascript-json-basics.html](https://loc801.locessentials.com/t-4/javascript-json-basics.html) (instructions are also available in Spanish)

## License and Attribution

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE).

**Original English content:** Copyright © 2026 Alaina Brandt

**For students:** When completing this assignment, you should:
- Credit yourself as the translator on the Spanish page (e.g., "Traducido por [Your Name]")
- Maintain attribution to the original author (Alaina Brandt) on the English page
- Include a link to this repository in your forked version

This ensures proper attribution while allowing you to showcase your translation work in your professional portfolio.
