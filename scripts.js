/* ============================================
   DENTAL WEBSITE - MAIN JAVASCRIPT
   Elite Dental Care - Advanced Dentistry
============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== VARIABLES & INITIALIZATION ==========
    let teamSwiper = null;
    let testimonialSwiper = null;
    
    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000);
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }
    
    // ========== STICKY HEADER ==========
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== ANIMATED COUNTERS ==========
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const counters = heroSection.querySelectorAll('.stat-number');
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.getAttribute('data-count') === '98' ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '98' ? '%' : '+');
                }
            }, 16);
        }
        
        // Initialize Intersection Observer for counters
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(heroSection);
    }
    
    // ========== SWIPER SLIDERS INITIALIZATION ==========
    function initSwipers() {
        // Team Slider
        const teamSliderEl = document.querySelector('.team .swiper');
        if (teamSliderEl) {
            teamSwiper = new Swiper('.team .swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            });
        }
        
        // Testimonial Slider
        const testimonialSliderEl = document.querySelector('.testimonials .swiper');
        if (testimonialSliderEl) {
            testimonialSwiper = new Swiper('.testimonials .swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Optional: Add navigation arrows
                navigation: {
                    nextEl: '.testimonials .swiper-button-next',
                    prevEl: '.testimonials .swiper-button-prev',
                },
            });
        }
    }
    
    // Initialize Swipers
    initSwipers();
    
    // ========== APPOINTMENT FORM HANDLING ==========
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentDate = document.getElementById('appointmentDate');
    
    // Set minimum date to tomorrow
    if (appointmentDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD
        const formattedDate = tomorrow.toISOString().split('T')[0];
        appointmentDate.min = formattedDate;
        appointmentDate.value = formattedDate;
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const serviceType = document.getElementById('serviceType').value;
            const appointmentDateValue = document.getElementById('appointmentDate').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!firstName || !lastName || !email || !phone || !serviceType || !appointmentDateValue) {
                showModal('Error', 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showModal('Error', 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                showModal('Error', 'Please enter a valid phone number.', 'error');
                return;
            }
            
            // Show success message
            const serviceNames = {
                'general': 'General Dentistry',
                'cosmetic': 'Cosmetic Dentistry',
                'implants': 'Dental Implants',
                'orthodontics': 'Orthodontics',
                'pediatric': 'Pediatric Dentistry',
                'emergency': 'Emergency Care',
                'consultation': 'Consultation'
            };
            
            const serviceName = serviceNames[serviceType] || 'Dental Service';
            const formattedDate = new Date(appointmentDateValue).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const successMessage = `
                <h3 style="color: var(--success); margin-bottom: 15px;">Appointment Request Sent!</h3>
                <p style="margin-bottom: 10px;">Thank you, <strong>${firstName} ${lastName}</strong>!</p>
                <p style="margin-bottom: 10px;">Your request for <strong>${serviceName}</strong> has been received.</p>
                <p style="margin-bottom: 10px;"><strong>Appointment Date:</strong> ${formattedDate}</p>
                <p style="margin-bottom: 20px;">We will contact you within 24 hours at <strong>${phone}</strong> to confirm your appointment.</p>
                <p style="font-size: 0.9rem; color: var(--gray-dark);">A confirmation email has been sent to ${email}</p>
            `;
            
            showModal('Success', successMessage, 'success');
            
            // Reset form
            appointmentForm.reset();
            
            // Reset date to tomorrow
            if (appointmentDate) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const newFormattedDate = tomorrow.toISOString().split('T')[0];
                appointmentDate.value = newFormattedDate;
            }
        });
    }
    
    // ========== MODAL FUNCTION ==========
    function showModal(title, content, type = 'info') {
        // Remove existing modal if any
        const existingModal = document.querySelector('.custom-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        // Set icon based on type
        let icon = 'info-circle';
        let iconColor = 'var(--primary)';
        
        if (type === 'success') {
            icon = 'check-circle';
            iconColor = 'var(--success)';
        } else if (type === 'error') {
            icon = 'exclamation-circle';
            iconColor = '#e74c3c';
        }
        
        modal.innerHTML = `
            <div style="
                background-color: white;
                padding: 50px 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            ">
                <div style="font-size: 4rem; color: ${iconColor}; margin-bottom: 20px;">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div id="modalContent">
                    ${content}
                </div>
                <button id="closeModal" style="
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 30px;
                    font-size: 1rem;
                ">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal button
        document.getElementById('closeModal').addEventListener('click', function() {
            modal.remove();
            style.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                style.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== SCROLL ANIMATIONS ==========
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add specific animations based on element
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transitionDelay = '0.' + (Array.from(entry.target.parentNode.children).indexOf(entry.target) % 10) + 's';
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply to elements
    document.querySelectorAll('.service-card, .tech-item, .appointment-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateOnScroll.observe(el);
    });
    
    // ========== FORM INPUT ENHANCEMENTS ==========
    // Add focus effects to form inputs
    document.querySelectorAll('.form-control').forEach(input => {
        // Add focus class
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ========== SERVICE CARDS INTERACTION ==========
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ========== WINDOW RESIZE HANDLER ==========
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Clear the timeout
        clearTimeout(resizeTimeout);
        
        // Set a new timeout
        resizeTimeout = setTimeout(function() {
            // Update Swipers
            if (teamSwiper) {
                teamSwiper.update();
            }
            if (testimonialSwiper) {
                testimonialSwiper.update();
            }
            
            // Close mobile menu on large screens
            if (window.innerWidth > 768 && mainNav) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        }, 250); // Wait 250ms after resize stops
    });
    
    // ========== CURRENT YEAR IN FOOTER ==========
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        // Add current year to copyright if not already present
        const copyrightElement = document.querySelector('.copyright p');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            const copyrightText = copyrightElement.innerHTML;
            if (!copyrightText.includes(currentYear.toString())) {
                copyrightElement.innerHTML = copyrightText.replace('2023', currentYear.toString());
            }
        }
    }
    
    // ========== ADDITIONAL ENHANCEMENTS ==========
    
    // 1. Add loading state to form submit button
    if (appointmentForm) {
        const submitButton = appointmentForm.querySelector('.btn-submit');
        if (submitButton) {
            appointmentForm.addEventListener('submit', function() {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitButton.disabled = true;
                
                // Reset button after 3 seconds (simulating processing)
                setTimeout(() => {
                    submitButton.innerHTML = 'Request Appointment';
                    submitButton.disabled = false;
                }, 3000);
            });
        }
    }
    
    // 2. Add hover effect to team member cards
    document.querySelectorAll('.team-slide').forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            const image = this.querySelector('.team-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        slide.addEventListener('mouseleave', function() {
            const image = this.querySelector('.team-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // 3. Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 4. Add keyboard navigation for sliders
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (teamSwiper) {
                teamSwiper.slidePrev();
            }
            if (testimonialSwiper) {
                testimonialSwiper.slidePrev();
            }
        }
        
        if (e.key === 'ArrowRight') {
            if (teamSwiper) {
                teamSwiper.slideNext();
            }
            if (testimonialSwiper) {
                testimonialSwiper.slideNext();
            }
        }
    });
    
    // 5. Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length > 0 && navLinks.length > 0) {
        function highlightNavLink() {
            let current = '';
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavLink);
        // Call once on load
        highlightNavLink();
    }
    
    // ========== CONSOLE GREETING ==========
    console.log('%c🦷 Elite Dental Care Website 🦷', 'color: #00b4d8; font-size: 16px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #2ecc71;');
    console.log('%cHave a great smile! 😄', 'color: #ff9e00;');
    
});

// ========== ADDITIONAL GLOBAL FUNCTIONS ==========

// Utility function to format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Utility function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        validateEmail,
        debounce
    };
}