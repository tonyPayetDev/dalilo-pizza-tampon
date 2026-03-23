// ===== DALILO PIZZA - Scripts =====
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // ===== LAZY LOADING IMAGES =====
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ===== ORDER MODAL =====
  const orderBtns = document.querySelectorAll('.order-btn');
  
  orderBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const itemName = this.getAttribute('data-item') || 'votre commande';
      showNotification('Commande ajoutée : ' + itemName);
    });
  });
  
  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <span style="font-size: 1.2rem;">🍕</span>
      <span>${message}</span>
    `;
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #D32F2F, #FF8F00);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styles);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // ===== PHONE NUMBER CLICK TRACKING =====
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      showNotification('Appel en cours...');
    });
  });
  
  // ===== PARALLAX EFFECT =====
  const hero = document.querySelector('.hero');
  
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
    });
  }
  
  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = function(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = function() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Trigger counters when in view
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
  
  // ===== FORM VALIDATION (if contact form exists) =====
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('[name="name"]');
      const email = this.querySelector('[name="email"]');
      const message = this.querySelector('[name="message"]');
      
      let isValid = true;
      
      if (!name.value.trim()) {
        name.classList.add('error');
        isValid = false;
      } else {
        name.classList.remove('error');
      }
      
      if (!email.value.trim() || !email.value.includes('@')) {
        email.classList.add('error');
        isValid = false;
      } else {
        email.classList.remove('error');
      }
      
      if (!message.value.trim()) {
        message.classList.add('error');
        isValid = false;
      } else {
        message.classList.remove('error');
      }
      
      if (isValid) {
        showNotification('Message envoyé avec succès !');
        this.reset();
      } else {
        showNotification('Veuillez remplir tous les champs');
      }
    });
  }
  
  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
  
});
