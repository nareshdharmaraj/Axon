/**
 * VANGUARD INDUSTRIAL OS // v1.0.4
 * Core Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const html = document.documentElement;

    // --- Custom Cursor Physics ---
    const cursor = document.createElement('div');
    cursor.id = 'v-cursor';
    const follower = document.createElement('div');
    follower.id = 'v-cursor-follower';
    body.appendChild(cursor);
    body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate3d(${followerX - 14}px, ${followerY - 14}px, 0)`;
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor Interactions
    document.querySelectorAll('a, button, .v-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(2.5)';
            follower.style.background = 'var(--v-accent-dim)';
            cursor.style.transform += ' scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform += ' scale(1)';
            follower.style.background = 'transparent';
            cursor.style.transform += ' scale(1)';
        });
    });

    // --- Theme & RTL Management ---
    const initSetting = (key, attr, fallback) => {
        const val = localStorage.getItem(key) || fallback;
        html.setAttribute(attr, val);
        return val;
    };

    initSetting('v-theme', 'data-theme', 'dark');
    initSetting('v-dir', 'dir', 'ltr');

    window.toggleTheme = () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('v-theme', next);
    };

    window.toggleRTL = () => {
        const current = html.getAttribute('dir');
        const next = current === 'ltr' ? 'rtl' : 'ltr';
        html.setAttribute('dir', next);
        localStorage.setItem('v-dir', next);
    };

    // --- Smooth Scroll Scrubber ---
    // Technical detail: scrubbing text/elements based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Scrubbing the hero sub-text
        const sub = document.querySelector('.hero-sub');
        if (sub) {
            sub.style.transform = `translateY(${scrolled * -0.2}px)`;
            sub.style.opacity = 1 - (scrolled / 500);
        }

        // Parallax logic removed to prevention section overlap
    });

    // --- Reveal Mechanism ---
    const revealOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.v-reveal').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
        revealObserver.observe(el);
    });

    // --- Mobile Menu Toggle ---
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');

            // Refined X animation
            toggle.children[0].style.transform = isActive ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            toggle.children[1].style.opacity = isActive ? '0' : '1';
            toggle.children[2].style.transform = isActive ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }


});
