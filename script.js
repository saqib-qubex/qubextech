document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const headerDemoBtn = document.querySelector('.navbar .btn-primary');
    const bodyDemoBtn = document.querySelector('.hero-cta .btn-primary');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const demoForm = document.getElementById('demoForm');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Show/hide header demo button based on scroll position
    window.addEventListener('scroll', function() {
        const bodyDemoBtnRect = bodyDemoBtn.getBoundingClientRect();
        if (bodyDemoBtnRect.top < 0) {
            headerDemoBtn.classList.remove('d-none');
        } else {
            headerDemoBtn.classList.add('d-none');
        }

        // Navbar background opacity
        if (window.scrollY > 50) {
            document.querySelector('.navbar').style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        } else {
            document.querySelector('.navbar').style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        }
    });

    // Email domain suggestions
    const emailSuggestions = ['@gmail.com', '@yahoo.com', '@hotmail.com'];
    const suggestionsList = document.createElement('datalist');
    suggestionsList.id = 'emailSuggestions';
    emailSuggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        suggestionsList.appendChild(option);
    });
    document.body.appendChild(suggestionsList);

    emailInput.addEventListener('input', function() {
        const emailParts = this.value.split('@');
        if (emailParts.length > 1 && emailParts[1].length > 0) {
            emailInput.setAttribute('list', 'emailSuggestions');
        } else {
            emailInput.removeAttribute('list');
        }
    });

    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Form validation and submission
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }

        // Validate phone
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid US phone number');
            return;
        }

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: emailInput.value,
            phone: phoneInput.value,
            title: document.getElementById('title').value,
            teamSize: document.getElementById('teamSize').value
        };

        // Here you would typically send the data to your server
        console.log('Form submission:', formData);

        // Show success message
        showSuccess();

        // Reset form and close modal
        demoForm.reset();
        bootstrap.Modal.getInstance(document.getElementById('demoModal')).hide();
    });

    // Error handling helper
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.classList.add('is-invalid');
    }

    // Success message helper
    function showSuccess() {
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success alert-dismissible fade show';
        successAlert.role = 'alert';
        successAlert.innerHTML = `
            Thank you for your interest! We will contact you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.querySelector('.modal-body').insertBefore(successAlert, demoForm);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Animation on scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.card, .section h2, .section p');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); // Run once on load

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});