/* ================================================
   MUSE MUSEUM — Main JavaScript
   ================================================ */

'use strict';

// ================================================
// LOADER
// ================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero bg animation
      document.querySelector('.hero-bg')?.classList.add('loaded');
    }
  }, 1800);
});

// ================================================
// NAVBAR SCROLL
// ================================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
}, { passive: true });

// ================================================
// MOBILE MENU
// ================================================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-menu-link');

navToggle?.addEventListener('click', () => {
  if (mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  } else {
    mobileMenu?.classList.add('open');
    navToggle?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});

function closeMobileMenu() {
  mobileMenu?.classList.remove('open');
  navToggle?.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuClose?.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// ================================================
// SCROLL REVEAL (Intersection Observer)
// ================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ================================================
// PARALLAX HERO
// ================================================
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${scrolled * 0.4}px)`;
  }
}, { passive: true });

// ================================================
// COUNTER ANIMATION
// ================================================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!el.classList.contains('counted')) {
        el.classList.add('counted');
        animateCounter(el, target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

// ================================================
// GALLERY FILTER
// ================================================
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.display = 'block';
      } else {
        item.style.opacity = '0.2';
        item.style.transform = 'scale(0.95)';
      }
    });
  });
});

// ================================================
// LIGHTBOX
// ================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img')?.src;
    const cssSrc = item.dataset.lightbox;
    if (imgSrc && lightboxImg && lightbox) {
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxClose?.addEventListener('click', () => {
  lightbox?.classList.remove('active');
  document.body.style.overflow = '';
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox?.classList.remove('active');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ================================================
// SMOOTH ACTIVE NAV ON SCROLL
// ================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
}, { passive: true });

// ================================================
// NEWSLETTER FORM
// ================================================
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('.newsletter-input');
  const btn = newsletterForm.querySelector('.newsletter-btn');
  const originalText = btn.textContent;

  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#2d7a2d';
  input.value = '';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 3000);
});

// ================================================
// STAGGERED ANIMATION FOR GRIDS
// ================================================
function staggerCards(containerSelector, cardSelector, delay = 100) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const cards = container.querySelectorAll(cardSelector);
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * delay);
      });
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  const cards = container.querySelectorAll(cardSelector);
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  observer.observe(container);
}

staggerCards('.artists-grid', '.artist-card', 120);
staggerCards('.exhibitions-grid', '.exhibition-card', 100);

// ================================================
// TEXT SCRAMBLE EFFECT (Hero title)
// ================================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\/[]{}—=+*^?#——————';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const old = this.el.innerText;
    const length = Math.max(old.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = old[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color: var(--gold); opacity: 0.5">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Apply scramble to hero subtitle words
setTimeout(() => {
  const heroEl = document.querySelector('.hero-scramble');
  if (heroEl) {
    const fx = new TextScramble(heroEl);
    const phrases = [
      'Where Art Meets Eternity',
      'Discover the Masters',
      'Experience the Extraordinary',
      'A Journey Through Time',
    ];
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3500);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
  }
}, 2000);

// ================================================
// TILT EFFECT ON CARDS
// ================================================
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

addTiltEffect('.ticket-card');

// ================================================
// NEWSLETTER FORM — prevent redirect, show success
// ================================================
(function () {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('newsletter-email');
    const btn = document.getElementById('newsletter-submit-btn');
    const email = emailInput ? emailInput.value.trim() : '';

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.style.borderColor = '#e74c3c';
      emailInput.placeholder = 'Please enter a valid email';
      setTimeout(() => {
        emailInput.style.borderColor = '';
        emailInput.placeholder = 'Your email address';
      }, 2500);
      return;
    }

    // Show loading state
    btn.textContent = 'Subscribing…';
    btn.disabled = true;

    // Simulate async subscription
    setTimeout(() => {
      // Replace the form with a success message
      const parent = form.parentElement;
      form.style.display = 'none';

      const msg = document.createElement('div');
      msg.style.cssText = `
        display:flex; flex-direction:column; align-items:center; gap:12px;
        animation: fadeIn 0.5s ease;
      `;
      msg.innerHTML = `
        <div style="font-size:2.5rem;">🎉</div>
        <p style="color:var(--gold);font-size:1.1rem;font-weight:600;letter-spacing:0.05em;">
          You're subscribed!
        </p>
        <p style="color:var(--white-muted);font-size:0.9rem;text-align:center;">
          Thank you! We'll keep you updated on exhibitions, events & offers.
        </p>
      `;
      parent.appendChild(msg);
    }, 800);
  });
})();
