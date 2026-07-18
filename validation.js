// Client-Side Input Fields Validation Engine
document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop default form transmission behavior

        // Fetch inputs from the document tree
        const nameField = document.getElementById('user-name');
        const emailField = document.getElementById('user-email');
        const subjectField = document.getElementById('user-subject');
        const messageField = document.getElementById('user-message');

        // Reset error message boxes before computing verification checks
        clearErrors();

        let isFormValid = true;

        // 1. Full Name Assessment
        if (nameField.value.trim() === '') {
            showFieldError(nameField, 'name-error', 'Full Name is required.');
            isFormValid = false;
        }

        // 2. Email Pattern Regular Expression Assessment
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === '') {
            showFieldError(emailField, 'email-error', 'Email Address is required.');
            isFormValid = false;
        } else if (!emailPattern.test(emailField.value.trim())) {
            showFieldError(emailField, 'email-error', 'Please enter a valid email structure.');
            isFormValid = false;
        }

        // 3. Subject Line Assessment
        if (subjectField.value.trim() === '') {
            showFieldError(subjectField, 'subject-error', 'Subject header line is required.');
            isFormValid = false;
        }

        // 4. Message Core Assessment
        if (messageField.value.trim() === '') {
            showFieldError(messageField, 'message-error', 'Please write out your query message body.');
            isFormValid = false;
        }

        // Processing result dispatch banner notification configurations
        if (isFormValid) {
            // Trigger dynamic green success message block
            formAlert.className = 'form-alert success';
            formAlert.textContent = 'Thank you! Your submission message was verified successfully.';
            
            // Wipe clean inputs out of user memory fields
            contactForm.reset();
        } else {
            // Trigger dynamic red failure flag error banner block
            formAlert.className = 'form-alert error';
            formAlert.textContent = 'Submission blocked. Please review the highlighted fields below.';
        }
    });

    // Helper functions to manage the UI states
    function showFieldError(inputElement, errorBoxId, messageText) {
        const errorContainer = document.getElementById(errorBoxId);
        errorContainer.textContent = messageText;
        inputElement.parentElement.classList.add('invalid-input');
    }

    function clearErrors() {
        // Clear banner status
        formAlert.style.display = 'none';
        formAlert.textContent = '';
        
        // Wipe specific validation styling tags from containers
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('invalid-input'));

        const errorLabels = document.querySelectorAll('.error-msg');
        errorLabels.forEach(label => label.textContent = '');
    }
});

