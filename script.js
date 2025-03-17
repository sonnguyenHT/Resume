// 2025 Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const progressBar = document.querySelector('.progress-bar');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const themeToggle = document.querySelector('.theme-toggle');
    const skillItems = document.querySelectorAll('.skill-tag');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Language Toggle
    const languageToggle = document.querySelector('.language-toggle');
    const langText = document.querySelector('.lang-text');
    
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language') || 'vi';
    
    // Set initial language
    setLanguage(savedLanguage);
    
    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    // Update progress bar on scroll
    function updateProgressBar() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const totalScrollable = docHeight - windowHeight;
        const percentage = (scrollPosition / totalScrollable) * 100;
        
        progressBar.style.width = `${percentage}%`;
        
        // Show/hide scroll to top button
        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
        
        // Highlight active navigation link
        highlightActiveSection(scrollPosition);
    }
    
    // Highlight active navigation link based on scroll position
    function highlightActiveSection(scrollPosition) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const cards = document.querySelectorAll('.card, .timeline-item, .skill-category');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Enable dark mode
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Disable dark mode
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Print CV
    function printCV() {
        window.print();
    }
    
    // Add click listeners to navigation links for smooth scrolling
    function setupSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Apply animation to skill tags
    function animateSkillTags() {
        skillItems.forEach((skill, index) => {
            skill.style.animationDelay = `${0.1 * index}s`;
        });
    }
    
    // Sticky navbar effect
    function handleNavbarSticky() {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar.offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--box-shadow-md)';
                navbar.style.height = '60px';
            } else {
                navbar.style.boxShadow = 'var(--box-shadow-sm)';
                navbar.style.height = '70px';
            }
        });
    }
    
    // Animate the hero section elements
    function animateHeroSection() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const contactInfo = document.querySelector('.contact-info');
        const heroActions = document.querySelector('.hero-actions');
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    contactInfo.style.opacity = '1';
                    contactInfo.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        heroActions.style.opacity = '1';
                        heroActions.style.transform = 'translateY(0)';
                    }, 200);
                }, 200);
            }, 200);
        }, 300);
    }
    
    // Add language toggle event listener
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const currentLang = document.documentElement.getAttribute('lang');
            const newLang = currentLang === 'vi' ? 'en' : 'vi';
            setLanguage(newLang);
            localStorage.setItem('language', newLang);
        });
    }
    
    // Function to set language
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        
        // Update toggle button text
        if (langText) {
            langText.textContent = lang === 'vi' ? 'EN' : 'VI';
        }
        
        // Update all elements with data-vi and data-en attributes
        const elementsWithLang = document.querySelectorAll('[data-vi][data-en]');
        elementsWithLang.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });
    }
    
    // Initialize all interactive elements
    function initializeInteractions() {
        // Theme toggle button
        if (themeToggle) {
            themeToggle.innerHTML = body.classList.contains('dark-mode') 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
            themeToggle.addEventListener('click', toggleDarkMode);
        }
        
        // Scroll to top button
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', scrollToTop);
        }
        
        // Print button (new fixed position)
        const printBtnFixed = document.querySelector('.print-btn-fixed');
        if (printBtnFixed) {
            printBtnFixed.addEventListener('click', printCV);
        }
        
        // Setup smooth scrolling
        setupSmoothScrolling();
        
        // Animate skill tags
        animateSkillTags();
        
        // Handle sticky navbar
        handleNavbarSticky();
        
        // Animate hero section
        animateHeroSection();
    }
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateProgressBar();
        animateOnScroll();
    });
    
    window.addEventListener('resize', updateProgressBar);
    
    // Initial update
    updateProgressBar();
    animateOnScroll();
    
    // Initialize interactions
    initializeInteractions();
}); 