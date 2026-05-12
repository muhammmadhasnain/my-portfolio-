/* 
   script.js
   Description: Interactive logic for Muhammad Hasnain's portfolio website.
   Author: Muhammad Hasnain
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE
    const nav = document.querySelector('nav');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });
    }

    // 2. SMOOTH SCROLL FOR NAV LINKS
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only process internal links starting with #
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Close mobile menu after clicking
                    if (navLinks) {
                        navLinks.classList.remove('open');
                        if (menuBtn) menuBtn.textContent = '☰';
                    }
                }
            }
        });
    });

    // 3. FADE-IN ON SCROLL (Intersection Observer)
    const fadeObserverOptions = {
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => fadeObserver.observe(element));

    // 4. ACTIVE NAV LINK HIGHLIGHT
    const sections = document.querySelectorAll('section[id]');
    
    const activeObserverOptions = {
        threshold: 0.5
    };

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (matchingLink) {
                    // Remove active from all links
                    links.forEach(link => link.classList.remove('active'));
                    // Add active to current link
                    matchingLink.classList.add('active');
                }
            }
        });
    }, activeObserverOptions);

    sections.forEach(section => activeObserver.observe(section));

    // 5. STAR BACKGROUND GENERATOR
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.prepend(starsContainer);

    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 4 + 2; // 2s to 6s
        star.style.setProperty('--duration', `${duration}s`);
        
        const delay = Math.random() * 4; // 0s to 4s
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }

});