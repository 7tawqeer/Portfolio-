 let isClickScrolling = false;
 // ── Grab elements ──
        const sections   = document.querySelectorAll('section');
        const allNavLinks = document.querySelectorAll('.nav-link');
        const hamburger  = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

     // ── 2.Scroll Listener ──
window.addEventListener('scroll', () => {
    if (isClickScrolling) return; // Stops the highlight from updating while auto-scrolling

    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 85) {
            current = section.getAttribute('id');
        }
    });
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ── 3. Click Listener ──
allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Lock the scroll listener
        isClickScrolling = true;

        // Manually update the active class immediately upon click
        allNavLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');

        // Unlock the scroll listener after the scroll finishes (approx 800ms)
        setTimeout(() => {
            isClickScrolling = false;
        }, 800); 
    });
});

        // ── 3. Hamburger toggle 
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close mobile menu when tapping outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
            }
        });

        // ── 4. Scroll-reveal: sections fade up as you scroll into them 
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        sections.forEach(s => revealObserver.observe(s));

        // ── 5. Typewriter animation
        // Cycles through these strings, typing and deleting each one
        const roles = [
            'BCA Student',
            'Always Exploring',
            'Future Cybersecurity'
        ];
        const typedEl   = document.getElementById('typed-text');
        let roleIndex   = 0;
        let charIndex   = 0;
        let isDeleting  = false;

        function typeLoop() {
            const current = roles[roleIndex];
            if (isDeleting) {
                typedEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 45 : 80;
            if (!isDeleting && charIndex === current.length) {
                delay = 1800;   // pause after full word is typed
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;    // short pause before typing next word
            }
            setTimeout(typeLoop, delay);
        }
        setTimeout(typeLoop, 700);
        