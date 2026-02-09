// terminology-quiz.js
// Handles quiz functionality with externalized strings
// Depends on: language-utils.js

let quizStrings = null;

/**
 * Creates an error element for displaying quiz errors
 * @returns {HTMLElement} The created error element
 */
function createQuizErrorElement() {
    const errorElement = document.createElement('div');
    errorElement.id = 'quiz-error';
    errorElement.className = 'error-message';
    errorElement.setAttribute('role', 'alert');
    errorElement.style.color = 'red';
    const quizContainer = document.querySelector('.quiz-container');
    const quizForm = document.querySelector('#quizForm');
    if (quizContainer && quizForm) {
        quizContainer.insertBefore(errorElement, quizForm);
    }
    return errorElement;
}

/**
 * Submits and evaluates quiz answers
 * @returns {boolean} False to prevent form submission
 */
function submitAnswers() {
    if (!quizStrings) {
        console.error('Quiz strings not loaded');
        alert('Quiz not ready. Please refresh the page.');
        return false;
    }

    const questions = quizStrings.questions;

    try {
        const form = document.forms["quizForm"];
        if (!form) {
            throw new Error(quizStrings.errorMessages.formNotFound);
        }

        let unansweredQuestions = [];
        let totalCorrect = 0;

        // Loop through each question
        for (const questionKey in questions) {
            const question = questions[questionKey];
            const radioButtons = form[questionKey];
            const feedbackElement = document.getElementById("feedback_" + questionKey);
            
            if (!feedbackElement) {
                throw new Error(quizStrings.errorMessages.feedbackElementNotFound.replace('{question}', questionKey));
            }

            if (!radioButtons) {
                throw new Error(quizStrings.errorMessages.radioButtonsNotFound.replace('{question}', questionKey));
            }

            // Check if question is answered
            const selectedValue = radioButtons.value;
            if (selectedValue === "") {
                unansweredQuestions.push(questionKey.replace('q', ''));
                continue;
            }

            // Process answer
            const isCorrect = selectedValue === question.correct;
            if (isCorrect) {
                totalCorrect++;
                feedbackElement.innerHTML = question.correctFeedback;
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.innerHTML = question.incorrectFeedback[selectedValue] || "Incorrect. Please try again.";
                feedbackElement.style.color = "red";
            }

            // Make feedback accessible to screen readers
            feedbackElement.setAttribute('role', 'alert');
        }

        // Handle unanswered questions
        if (unansweredQuestions.length > 0) {
            const questionWord = unansweredQuestions.length === 1 
                ? quizStrings.quizError.question 
                : quizStrings.quizError.questions;
            const errorMsg = `${quizStrings.quizError.pleaseAnswer} ${questionWord} ${unansweredQuestions.join(', ')}`;
            const errorElement = document.getElementById('quiz-error') || createQuizErrorElement();
            errorElement.textContent = errorMsg;
            errorElement.style.display = 'block';
            return false;
        }

        // Announce final score to screen readers
        const scoreAnnouncement = document.createElement('div');
        scoreAnnouncement.setAttribute('role', 'status');
        scoreAnnouncement.setAttribute('aria-live', 'polite');
        scoreAnnouncement.className = 'sr-only';
        scoreAnnouncement.textContent = quizStrings.accessibility.scoreAnnouncement
            .replace('{correct}', totalCorrect)
            .replace('{total}', Object.keys(questions).length);
        document.querySelector('.quiz-container').appendChild(scoreAnnouncement);

    } catch (error) {
        console.error('Quiz error:', error);
        const errorElement = document.getElementById('quiz-error') || createQuizErrorElement();
        errorElement.textContent = quizStrings.accessibility.generalError;
        errorElement.style.display = 'block';
    }

    return false;
}

/**
 * Initializes the quiz by loading language-specific strings
 */
async function initializeQuiz() {
    const currentLanguage = getCurrentLanguage();
    
    try {
        const allStrings = await loadLanguageStrings(currentLanguage);
        quizStrings = allStrings.quiz;
    } catch (error) {
        console.error('Failed to load quiz strings:', error);
        alert('Failed to load quiz. Please refresh the page.');
    }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', initializeQuiz);