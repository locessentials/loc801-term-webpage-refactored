// language-utils.js
// Shared utility functions for language detection and string management

/**
 * Determines the current language based on the filename pattern
 * @returns {string} Language code ('en-US' or 'es-MX')
 */
function getCurrentLanguage() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // Detect language from filename pattern
    if (filename.includes('_es-MX') || filename.includes('_es')) {
        return 'es-MX';
    }
    return 'en-US';
}

/**
 * Gets the filename for the other language version
 * @returns {string} Filename for the alternate language
 */
function getOtherLanguageFile() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    const currentLang = getCurrentLanguage();
    
    // Switch between languages by replacing language code in filename
    if (currentLang === 'en-US') {
        return filename.replace('_en-US', '_es-MX').replace('_en', '_es-MX');
    } else {
        return filename.replace('_es-MX', '_en-US').replace('_es', '_en-US');
    }
}

/**
 * Loads language strings from the appropriate JSON file
 * @param {string} lang - Language code ('en-US' or 'es-MX')
 * @returns {Promise<Object>} Promise resolving to the strings object
 */
async function loadLanguageStrings(lang) {
    try {
        const response = await fetch(`strings_${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading language strings:', error);
        // Fallback to English if loading fails
        if (lang !== 'en-US') {
            console.warn('Falling back to English');
            return loadLanguageStrings('en-US');
        }
        throw error;
    }
}
