// script.js

// Fonction pour afficher une section spécifique
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Écouter les clics sur les liens de navigation
function setupNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Empêcher le comportement par défaut du lien
            e.preventDefault();

            // Récupérer l'ID de la section à afficher
            const sectionId = this.getAttribute('data-section');

            // Afficher la section correspondante
            showSection(sectionId);

            // Mettre à jour l'URL dans la barre d'adresse
            history.pushState(null, null, `#${sectionId}`);
        });
    });

    // Gérer les changements d'URL (par exemple, lorsque l'utilisateur utilise les boutons précédent/suivant du navigateur)
    window.addEventListener('popstate', () => {
        const sectionId = window.location.hash.substring(1) || 'home';
        showSection(sectionId);
    });

    // Afficher la section correspondant à l'URL au chargement de la page
    window.addEventListener('load', () => {
        const sectionId = window.location.hash.substring(1) || 'home';
        showSection(sectionId);
    });
}

// Smooth scrolling pour les liens de navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation au chargement de la page
function animateOnLoad() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1.5s ease';
            hero.style.opacity = '1';
        }, 500);
    }
}

// Gestion des formulaires
function setupFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }

            // Simuler l'envoi du formulaire
            console.log('Formulaire soumis avec succès:', { name, email, subject, message });
            alert('Votre message a été envoyé avec succès !');
            this.reset();
        });
    }
}

// Interactions pour les projets
function setupProjectInteractions() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-10px)';
        });
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0)';
        });
    });
}

// Gestion du bouton "Haut de page"
function setupScrollToTop() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Gestion des témoignages (carrousel)
function setupTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;

    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        }, 5000); // Change de témoignage toutes les 5 secondes
    }
}

// Gestion des animations au scroll
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(section);
    });
}

// Fonction pour initialiser les événements et les interactions
function init() {
    setupNavigation(); // Gestion de la navigation SPA
    setupSmoothScrolling(); // Smooth scrolling
    animateOnLoad(); // Animation au chargement
    setupFormValidation(); // Validation du formulaire
    setupProjectInteractions(); // Interactions pour les projets
    setupScrollToTop(); // Bouton "Haut de page"
    setupTestimonialsCarousel(); // Carrousel de témoignages
    setupScrollAnimations(); // Animations au scroll
}

// Initialisation du script
document.addEventListener('DOMContentLoaded', init);