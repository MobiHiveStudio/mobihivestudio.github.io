// Smooth scrolling for navigation links
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

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Add animation to feature cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .app-card, .benefit-card').forEach(card => {
    observer.observe(card);
});

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav-container');
    const mobileNavButton = document.createElement('button');
    mobileNavButton.classList.add('mobile-nav-toggle');
    mobileNavButton.innerHTML = `
        <span class="hamburger"></span>
    `;
    
    nav.appendChild(mobileNavButton);
    
    mobileNavButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        mobileNavButton.classList.toggle('active');
    });
};

// Initialize mobile navigation if screen width is small
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Add CSS for mobile navigation
const style = document.createElement('style');
style.textContent = `
    .mobile-nav-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
    }

    .hamburger {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--electric-blue);
        position: relative;
        transition: background 0.3s;
    }

    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 2px;
        background: var(--electric-blue);
        transition: transform 0.3s;
    }

    .hamburger::before {
        top: -6px;
    }

    .hamburger::after {
        bottom: -6px;
    }

    .mobile-nav-toggle.active .hamburger {
        background: transparent;
    }

    .mobile-nav-toggle.active .hamburger::before {
        transform: rotate(45deg);
        top: 0;
    }

    .mobile-nav-toggle.active .hamburger::after {
        transform: rotate(-45deg);
        bottom: 0;
    }

    @media (max-width: 768px) {
        .mobile-nav-toggle {
            display: block;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .nav-links.show {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }

    .feature-card, .app-card, .benefit-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }

    .feature-card.animate, .app-card.animate, .benefit-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style); 