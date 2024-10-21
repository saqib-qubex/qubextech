document.addEventListener('DOMContentLoaded', function() {
    const headerDemoBtn = document.getElementById('headerDemoBtn');
    const bodyDemoBtn = document.getElementById('bodyDemoBtn');
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

    // Form validation
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        // US phone number validation
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            alert('Please enter a valid US phone number.');
            phoneInput.focus();
            return;
        }

        // If all validations pass, you can submit the form or handle the data as needed
        alert('Thank you for your interest! We will contact you soon to schedule a demo.');
        
        // Close the modal
        const demoModal = bootstrap.Modal.getInstance(document.getElementById('demoModal'));
        demoModal.hide();
        
        // Reset the form
        demoForm.reset();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Add animation to cards on scroll
    const animateCards = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateCards);
    animateCards(); // Run once on load

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle mobile menu toggle
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});