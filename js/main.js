/* =====================================================
   Gliders Tech — main.js
   Phase 1: Global Foundation
   Vanilla JS only — no dependencies
   ===================================================== */

(function () {

  'use strict';

  /* ── Sticky Navigation ── */

  const siteNav = document.querySelector('.site-nav');

  if (siteNav) {

    const onScroll = function () {

      if (window.scrollY > 50) {

        siteNav.classList.add('scrolled');

      } else {

        siteNav.classList.remove('scrolled');

      }

    };

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Run once on load in case page starts scrolled */

    onScroll();

  }

  /* ── Mobile Menu Toggle ── */

  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {

    navToggle.addEventListener('click', function () {

      const isOpen = navMobile.classList.contains('open');

      navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(!isOpen));

    });

    /* Close on outside click */

    document.addEventListener('click', function (e) {

      if (
        navMobile.classList.contains('open') &&
        !navMobile.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {

        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');

      }

    });

    /* Close on ESC key */

    document.addEventListener('keydown', function (e) {

      if (e.key === 'Escape' && navMobile.classList.contains('open')) {

        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();

      }

    });

  }

  /* ── Active Navigation Link ── */

  const currentPath = window.location.pathname;

  const allNavLinks = document.querySelectorAll(
    '.nav-links a, .nav-mobile ul li a'
  );

  allNavLinks.forEach(function (link) {

    const linkPath = link.getAttribute('href');

    if (!linkPath) return;

    /* Exact match or path ends with the link's href */

    const isHome =
      (linkPath === 'index.html' || linkPath === '/') &&
      (currentPath === '/' ||
        currentPath.endsWith('/index.html') ||
        currentPath.endsWith('/'));

    const isMatch =
      isHome ||
      (linkPath !== 'index.html' &&
        linkPath !== '/' &&
        currentPath.endsWith(linkPath));

    if (isMatch) {

      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

    }

  });

  /* ── Back to Top ── */

  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {

    const toggleVisibility = function () {

      if (window.scrollY > 400) {

        backToTop.classList.add('visible');

      } else {

        backToTop.classList.remove('visible');

      }

    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    backToTop.addEventListener('click', function () {

      window.scrollTo({ top: 0, behavior: 'smooth' });

    });

    /* Run once on load */

    toggleVisibility();

  }

  /* ── Smooth Scroll for Anchor Links ── */

  document.addEventListener('click', function (e) {

    const target = e.target.closest('a[href^="#"]');

    if (!target) return;

    const id = target.getAttribute('href');

    if (id === '#') return;

    const destination = document.querySelector(id);

    if (!destination) return;

    e.preventDefault();

    destination.scrollIntoView({ behavior: 'smooth', block: 'start' });

    /* Update URL without jump */

    history.pushState(null, '', id);

  });

  /* ── Contact Form — mailto handler ── */

  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');

  if (contactForm) {

    contactForm.addEventListener('submit', function (e) {

      e.preventDefault();

      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      /* Basic validation */

      if (!name || !email || !subject || !message) {

        if (formStatus) {

          formStatus.textContent =
            'Please fill in all fields before sending.';
          formStatus.className = 'form-status error';

        }

        return;

      }

      /* Build mailto URL */

      const body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message;

      const mailtoURL =
        'mailto:official.gliderstech@gmail.com' +
        '?subject=' + encodeURIComponent('[Gliders Tech] ' + subject) +
        '&body='    + encodeURIComponent(body);

      /* Open email client */

      window.location.href = mailtoURL;

      /* Show confirmation */

      if (formStatus) {

        formStatus.textContent =
          'Your email client should open with your message pre-filled. ' +
          'If it does not open, please email us directly at ' +
          'official.gliderstech@gmail.com';
        formStatus.className = 'form-status success';

      }

    });

  }

})();