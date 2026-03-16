// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}


// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const menuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMenu() {
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
}

if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navigation Dashboard Toggle
const dashboardToggle = document.querySelector('.dashboard-toggle-btn');
const siteDashboard = document.getElementById('siteDashboard');
const closeDashboard = document.querySelector('.close-dashboard');

if (!document.querySelector('.dashboard-overlay')) {
    const overlay = document.createElement('div');
    overlay.classList.add('dashboard-overlay');
    document.body.appendChild(overlay);
}
const dashboardOverlay = document.querySelector('.dashboard-overlay');

const toggleDashboard = () => {
    siteDashboard.classList.toggle('active');
    dashboardOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
};

if (dashboardToggle) dashboardToggle.addEventListener('click', toggleDashboard);
if (closeDashboard) closeDashboard.addEventListener('click', toggleDashboard);
if (dashboardOverlay) dashboardOverlay.addEventListener('click', toggleDashboard);

// Dashboard Link Interactions
const dashboardNavLinks = document.querySelectorAll('.dashboard-link');
dashboardNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        dashboardNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        toggleDashboard();
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Product Modal Logic
const productData = {
    beans: {
        title: "Premium Cocoa Beans",
        desc: "Our beans are carefully fermented and sun-dried to develop a complex flavor profile. We strictly follow international quality standards to ensure consistency and excellence in every bag.",
        image: "assets/cocoa-beans.png",
        specs: [
            ["Origin", "Ghana (Twifo Praso)"],
            ["Grade", "Grade 1 Export Selection"],
            ["Moisture Content", "< 7.5%"],
            ["Fermentation", "100% Fully Fermented"],
            ["Packaging", "62.5kg Jute Bags"]
        ]
    },
    powder: {
        title: "Pure Cocoa Powder",
        desc: "Heritage Cocoa powder is known for its intense aroma and deep color. It's processed without harsh chemicals, maintaining the natural antioxidants and rich cocoa heart.",
        image: "assets/cocoa-powder.png",
        specs: [
            ["Type", "Natural / Alkalized"],
            ["Fat Content", "10 - 12%"],
            ["pH Level", "6.8 - 7.4"],
            ["Fineness", "99% through 200 mesh"],
            ["Application", "Baking, Beverages, Dairy"]
        ]
    },
    butter: {
        title: "Prime Cocoa Butter",
        desc: "Our cocoa butter is pure, deodorized, and filtered to perfection. It provides the ideal melt-in-mouth quality for premium chocolate and the smooth texture required for luxury cosmetics.",
        image: "assets/cocoa-butter.png",
        specs: [
            ["Appearance", "Pale Yellow / Brittle"],
            ["Melting Point", "32°C - 35°C"],
            ["Free Fatty Acids", "< 1.75%"],
            ["Iodine Value", "33 - 42 g I2/100g"],
            ["Flavor", "Neutral / Characteristic Cocoa"]
        ]
    }
};

const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const modalSpecsList = document.getElementById('modalSpecsList');
const viewButtons = document.querySelectorAll('.product-view-btn');
const closeModals = document.querySelectorAll('.close-modal, .close-modal-action');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productKey = btn.getAttribute('data-product');
        const data = productData[productKey];

        if (data) {
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            modalImg.src = data.image;

            // Clear and populate specs
            modalSpecsList.innerHTML = '';
            data.specs.forEach(spec => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${spec[0]}</span> <span>${spec[1]}</span>`;
                modalSpecsList.appendChild(li);
            });

            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form Submission (Redirects to WhatsApp)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const product = document.getElementById('product-select').value;
        const quantity = document.getElementById('quantity').value || 'N/A';
        const message = document.getElementById('message').value;
        
        // Construct WhatsApp message
        const whatsappNumber = '233551144061';
        const text = `*New Inquiry for Heritage Cocoa*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Product:* ${product.charAt(0).toUpperCase() + product.slice(1)}%0A` +
                     `*Quantity:* ${quantity} tons%0A` +
                     `*Message:* ${message}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
        
        // Show loading state
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="ph ph-circle-notch animate-spin"></i> Redirecting to WhatsApp...';
        btn.style.backgroundColor = 'var(--clr-earth-green)';
        btn.disabled = true;
        
        // Redirect after a short delay for feedback
        setTimeout(() => {
            window.location.href = whatsappUrl;
            
            // Re-enable button and reset form after a long delay (enough for the redirect to happen)
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
}
