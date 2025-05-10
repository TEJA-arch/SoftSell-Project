// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Theme toggle button functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        // Update button icon
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';

        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const companyInput = document.getElementById('company');
            const licenseTypeInput = document.getElementById('licenseType');

            let isValid = true;

            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }

            // Validate company
            if (!companyInput.value.trim()) {
                companyInput.classList.add('is-invalid');
                isValid = false;
            } else {
                companyInput.classList.remove('is-invalid');
            }

            // Validate license type
            if (!licenseTypeInput.value) {
                licenseTypeInput.classList.add('is-invalid');
                isValid = false;
            } else {
                licenseTypeInput.classList.remove('is-invalid');
            }

            // If valid, display success message (in a real app, this would submit the form)
            if (isValid) {
                // Create success alert
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
                successAlert.innerHTML = `
          <i class="fas fa-check-circle me-2"></i>
          Form submitted successfully! We'll contact you shortly with your valuation.
        `;

                // Insert alert after form
                contactForm.parentNode.insertBefore(successAlert, contactForm.nextSibling);

                // Reset form
                contactForm.reset();

                // Remove alert after 5 seconds
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
            }
        });
    }

    // Add animation classes as elements come into view
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll(
            '.card, .icon-wrapper, .feature-icon-wrapper, h2, .lead'
        );

        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    }

    // Run once on load
    animateOnScroll();

    // Add event listener for scroll
    window.addEventListener('scroll', animateOnScroll);
});