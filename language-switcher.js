// language-switcher.js
// Handles language switching functionality with externalized strings
// Depends on: language-utils.js

let switcherStrings = null;

/**
 * Changes the page language by navigating to the other language version
 * @param {string} targetLanguage - The target language code
 */
function changeLanguage(targetLanguage) {
    const languageSelect = document.getElementById('language-select');
    const errorContainer = document.getElementById('language-error');
    const currentLanguage = getCurrentLanguage();
    
    if (!switcherStrings) {
        console.error('Language strings not loaded');
        return;
    }
    
    try {
        // Don't do anything if already on target language
        if (targetLanguage === currentLanguage) {
            return;
        }
        
        const targetFile = getOtherLanguageFile();
        
        // Announce language change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        
        const langName = targetLanguage === 'en-US' 
            ? switcherStrings.accessibility.english 
            : switcherStrings.accessibility.spanish;
        announcement.textContent = `${switcherStrings.accessibility.changingLanguage} ${langName}`;
        document.body.appendChild(announcement);
        
        // Navigate to the other language version
        window.location.href = targetFile;
        
    } catch (error) {
        console.error('Language switching error:', error);
        
        // Display error message
        if (errorContainer) {
            errorContainer.textContent = switcherStrings.errorMessages.switchError;
            errorContainer.setAttribute('role', 'alert');
            errorContainer.style.display = 'block';
        }
        
        // Reset select to current language
        if (languageSelect) {
            languageSelect.value = currentLanguage;
        }
    }
}

/**
 * Initializes the language switcher on page load
 */
async function initializeLanguageSwitcher() {
    const languageSelect = document.getElementById('language-select');
    const currentLanguage = getCurrentLanguage();
    
    try {
        // Load language strings
        const allStrings = await loadLanguageStrings(currentLanguage);
        switcherStrings = allStrings.languageSwitcher;
        
        if (!languageSelect) {
            console.error('Language select element not found');
            return;
        }

        // Set initial language based on current page
        languageSelect.value = currentLanguage;
        
        // Add ARIA label for accessibility
        languageSelect.setAttribute('aria-label', switcherStrings.accessibility.ariaLabel);
        
        // Set up the onchange handler
        languageSelect.onchange = function() {
            changeLanguage(this.value);
        };
        
    } catch (error) {
        console.error('Failed to initialize language switcher:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);