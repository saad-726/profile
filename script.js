document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Icon switch
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scroll for anchor links (fallback for complex behaviors, but CSS scroll-behavior usually handles it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Helper to animate elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.card, .hero-title, .hero-subtitle, .timeline-item, .about-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };

    // Add animation class via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    animateElements();

    // Interactive Hero Background
    const hero = document.querySelector('.hero');
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    if (hero && orb1 && orb2 && orb3) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();

            // Mouse position relative to hero section
            const x = clientX - left;
            const y = clientY - top;

            // Normalize values (-1 to 1)
            const xPct = (x / width - 0.5) * 2;
            const yPct = (y / height - 0.5) * 2;

            // Orb 1 moves opposite to mouse
            orb1.style.transform = `translate(${xPct * -50}px, ${yPct * -50}px)`;

            // Orb 2 moves with mouse but slower
            orb2.style.transform = `translate(${xPct * 30}px, ${yPct * 30}px)`;

            // Orb 3 follows mouse directly (cursor spotlight)
            orb3.style.opacity = '0.8';
            orb3.style.left = `${x}px`;
            orb3.style.top = `${y}px`;
        });

        hero.addEventListener('mouseleave', () => {
            orb3.style.opacity = '0';
            orb1.style.transform = `translate(0, 0)`;
            orb2.style.transform = `translate(0, 0)`;
        });
    }
});
