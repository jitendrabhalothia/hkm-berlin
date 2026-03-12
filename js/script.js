/* ============================================================
   HARE KRISHNA MOVEMENT BERLIN — script.js
   Navigation, animations, gallery lightbox, scroll effects
   ============================================================ */

/* ============================================================
   1. STICKY NAVBAR — adds "scrolled" class after scrolling
   ============================================================ */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ============================================================
   2. MOBILE MENU TOGGLE
   ============================================================ */
(function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


/* ============================================================
   3. ACTIVE NAV LINK — highlights current page in nav
   ============================================================ */
(function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  allLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* ============================================================
   4. SCROLL REVEAL — fade-up and fade-in animations
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up, .fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   5. GALLERY LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Open lightbox on gallery item click
  document.querySelectorAll('.gallery-item[data-src]').forEach(function (item) {
    item.addEventListener('click', function () {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption') || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Close on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
})();


/* ============================================================
   6. GALLERY FILTER TABS
   ============================================================ */
(function initGalleryFilter() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (!tabs.length || !items.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      items.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          // Re-trigger fade-up
          item.classList.remove('visible');
          setTimeout(function () { item.classList.add('visible'); }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();


/* ============================================================
   7. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});


/* ============================================================
   8. CONTACT FORM — basic validation + submission feedback
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    // Using Formspree — replace YOUR_FORM_ID in contact.html
    // Allow native submission unless you want to handle via fetch

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }
  });
})();


/* ============================================================
   9. YEAR in footer copyright
   ============================================================ */
(function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ============================================================
   10. MAHA-MANTRA SECTION — trigger animations on scroll-in
   ============================================================ */
(function initMantraObserver() {
  var section = document.querySelector('.mantra-section');
  if (!section) return;

  function activate() {
    section.classList.add('is-visible');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activate();
          /* Re-arm: remove + re-add class so animation plays again
             each time the user scrolls back to this section */
          io.unobserve(section);
          /* Watch for it leaving, then re-observe so it replays */
          var leaveIO = new IntersectionObserver(function (e2) {
            e2.forEach(function (ev) {
              if (!ev.isIntersecting) {
                section.classList.remove('is-visible');
                leaveIO.unobserve(section);
                io.observe(section); // watch for next entry
              }
            });
          }, { threshold: 0 });
          leaveIO.observe(section);
        }
      });
    }, { threshold: 0.25 });
    io.observe(section);
  } else {
    activate(); // fallback
  }
})();


/* ============================================================
   11. CHANT AND BE HAPPY SLIDER — auto-advances every 5s
   ============================================================ */
(function initChantSlider() {
  const slides  = document.querySelectorAll('.ch-slide');
  const dots    = document.querySelectorAll('.ch-dot');
  const prevBtn = document.querySelector('.ch-prev');
  const nextBtn = document.querySelector('.ch-next');
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const DELAY  = 5000;

  // Add progress bar element
  const inner = document.querySelector('.chant-happy-inner');
  const prog  = document.createElement('div');
  prog.className = 'ch-progress';
  prog.style.width = '0%';
  inner.appendChild(prog);

  let progStart = null;
  function animateProgress(ts) {
    if (!progStart) progStart = ts;
    const elapsed = ts - progStart;
    prog.style.width = Math.min((elapsed / DELAY) * 100, 100) + '%';
    if (elapsed < DELAY) { requestAnimationFrame(animateProgress); }
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].classList.add('exit');
    setTimeout(() => { slides[current] && slides[current].classList.remove('exit'); }, 700);
    dots[current] && dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');

    // Reset progress
    prog.style.transition = 'none';
    prog.style.width = '0%';
    progStart = null;
    requestAnimationFrame(animateProgress);

    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }

  // Dot clicks
  dots.forEach((dot) => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.dot, 10)));
  });

  // Arrow clicks
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe support
  let touchStartX = 0;
  inner.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  inner.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Pause on hover
  inner.addEventListener('mouseenter', () => clearInterval(timer));
  inner.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  });

  // Start
  progStart = null;
  requestAnimationFrame(animateProgress);
  timer = setInterval(() => goTo(current + 1), DELAY);
})();


/* ============================================================
   11. FLOATING KIRTAN AUDIO BUTTON — play / pause only
       Hidden YouTube iframe for audio; no popup video panel
   ============================================================ */
(function initKirtanPlayer() {

  // Hidden iframe for audio only
  const iframe = document.createElement('iframe');
  iframe.id = 'kirtan-audio-iframe';
  iframe.style.cssText = 'position:fixed;bottom:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;border:none;';
  iframe.allow = 'autoplay; encrypted-media';
  iframe.title = 'Kirtan audio';
  document.body.appendChild(iframe);

  // Floating play/pause button
  const btn = document.createElement('button');
  btn.id = 'kirtan-fab';
  btn.className = 'kirtan-fab';
  btn.setAttribute('aria-label', 'Play Kirtan');
  btn.title = 'Kirtan — Srila Prabhupada';
  btn.innerHTML = `
    <span class="kirtan-fab-icon play-icon"><i class="fas fa-music"></i></span>
    <span class="kirtan-fab-icon pause-icon" style="display:none;"><i class="fas fa-pause"></i></span>
    <span class="kirtan-fab-label">Kirtan</span>
  `;
  document.body.appendChild(btn);

  const SRC = 'https://www.youtube.com/embed/ubbT9Jm4DOs?autoplay=1&start=61&rel=0&modestbranding=1&enablejsapi=0';
  let playing = false;

  var heroBadge = document.getElementById('kirtan-hero-trigger');

  function play() {
    playing = true;
    iframe.src = SRC;
    btn.classList.add('is-playing');
    btn.querySelector('.play-icon').style.display  = 'none';
    btn.querySelector('.pause-icon').style.display = '';
    btn.setAttribute('aria-label', 'Pause Kirtan');
    if (heroBadge) {
      heroBadge.classList.add('is-playing');
      var icon = heroBadge.querySelector('.khb-play-icon i');
      if (icon) { icon.className = 'fas fa-pause'; }
      var sub = heroBadge.querySelector('.khb-sub');
      if (sub) sub.textContent = '🎵 Now playing…';
    }
  }

  function pause() {
    playing = false;
    iframe.src = '';
    btn.classList.remove('is-playing');
    btn.querySelector('.play-icon').style.display  = '';
    btn.querySelector('.pause-icon').style.display = 'none';
    btn.setAttribute('aria-label', 'Play Kirtan');
    if (heroBadge) {
      heroBadge.classList.remove('is-playing');
      var icon = heroBadge.querySelector('.khb-play-icon i');
      if (icon) { icon.className = 'fas fa-play'; }
      var sub = heroBadge.querySelector('.khb-sub');
      if (sub) sub.textContent = '🎵 Don\'t miss it!';
    }
  }

  btn.addEventListener('click', function () {
    playing ? pause() : play();
  });

  /* Hero badge also controls the same audio */
  if (heroBadge) {
    heroBadge.addEventListener('click', function () {
      playing ? pause() : play();
    });
  }

})();

/* ── PHOTO SLIDER ── */
(function () {
  var section = document.getElementById('photoSlider');
  if (!section) return;

  var slides = Array.from(section.querySelectorAll('.photo-slide'));
  var dots   = Array.from(document.querySelectorAll('.ps-dot'));
  var prev   = document.querySelector('.ps-prev');
  var next   = document.querySelector('.ps-next');
  var current = 0;
  var timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 4000);
  }

  if (prev) prev.addEventListener('click', function () { goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', function () { goTo(current + 1); startAuto(); });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () { goTo(+dot.dataset.idx); startAuto(); });
  });

  /* Swipe support */
  var startX = 0;
  section.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  section.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
  });

  startAuto();
})();
