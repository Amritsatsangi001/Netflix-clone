// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Email form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('.email-input');
    const getStartedBtn = document.querySelector('.get-started-btn');
    const signinBtn = document.querySelector('.signin-btn');

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get Started button click handler
    getStartedBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showError('Please enter your email address.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        showSuccess('Thank you! We\'ll be in touch soon.');
        emailInput.value = '';
    });

    // Sign In button click handler
    signinBtn.addEventListener('click', function() {
        showMessage('Sign In functionality would be implemented here.');
    });

    // Enter key handler for email input
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getStartedBtn.click();
        }
    });

    // Language selector change handler
    const languageSelect = document.querySelector('.language-select');
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        showMessage(`Language changed to ${this.options[this.selectedIndex].text}`);
    });

    // Error message display
    function showError(message) {
        showMessage(message, 'error');
    }

    // Success message display
    function showSuccess(message) {
        showMessage(message, 'success');
    }

    // Generic message display
    function showMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'error' ? '#e50914' : type === 'success' ? '#00ff00' : '#0071eb'};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(messageDiv);

        // Animate in
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 3000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(50px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(feature);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close any open modals or messages
        if (e.key === 'Escape') {
            const messagePopup = document.querySelector('.message-popup');
            if (messagePopup) {
                messagePopup.remove();
            }
        }
    });

    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for navigation
                console.log('Swipe down detected');
            }
        }
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Any scroll-based animations or effects can go here
        }, 16); // ~60fps
    });

    console.log('Netflix Clone loaded successfully!');
}); 