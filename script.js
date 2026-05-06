/* =========================================================
   Jonathan Tornberg — Personal Site
   Lightweight interactions — no frameworks.
   ========================================================= */

(() => {
  'use strict';

  /* ------------------------------------------------------
     Nav: scroll state + mobile menu
     ------------------------------------------------------ */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    if (window.scrollY > 24) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ------------------------------------------------------
     Smooth scroll (with nav offset)
     ------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = nav.classList.contains('nav--scrolled') ? 72 : 100;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------------------
     Active section in nav
     ------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
  const setActive = (id) => {
    navAnchors.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
    });
  };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(
    '.hero__meta, .hero__title, .hero__lede, .hero__foot, ' +
    '.section__aside, .section__body > *, ' +
    '.timeline__item, .project, .stat, .cred, .toolkit__col, ' +
    '.contact__form, .contact__direct'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // small stagger based on index within its parent
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children);
        const i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => io.observe(el));

  /* ------------------------------------------------------
     Contact form
     ------------------------------------------------------ */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    message: (v) => v.trim().length >= 10 || 'Messages should be at least 10 characters.'
  };

  const setFieldError = (name, msg) => {
    const input = form.querySelector(`[name="${name}"]`);
    const errEl = form.querySelector(`.field__error[data-for="${name}"]`);
    const fieldEl = input.closest('.field');
    if (msg) {
      fieldEl.classList.add('field--error');
      errEl.textContent = msg;
    } else {
      fieldEl.classList.remove('field--error');
      errEl.textContent = '';
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    let isValid = true;

    Object.keys(validators).forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      const result = validators[name](input.value);
      if (result === true) {
        setFieldError(name, '');
      } else {
        setFieldError(name, result);
        if (!firstInvalid) firstInvalid = input;
        isValid = false;
      }
    });

    if (!isValid) {
      firstInvalid.focus();
      return;
    }

    // Simulated submission — swap for fetch() to a backend or Formspree in production.
    success.hidden = false;
    form.reset();
    setTimeout(() => { success.hidden = true; }, 5000);
  });

  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => setFieldError(el.name, ''));
  });

  /* ------------------------------------------------------
     Footer year
     ------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
