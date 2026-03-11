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
   10. CHANT AND BE HAPPY SLIDER — auto-advances every 5s
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
   11. FLOATING KIRTAN PLAYER — optional, user-triggered
       Uses YouTube video Kt21pBgL2aw (Srila Prabhupada kirtan)
   ============================================================ */
(function initKirtanPlayer() {

  // Inject player HTML into body
  const playerHTML = `
    <div id="kirtan-player" class="kirtan-player" aria-label="Kirtan Player" role="complementary">
      <button class="kirtan-toggle" id="kirtan-toggle" aria-label="Listen to Kirtan" title="Listen to Kirtan by Srila Prabhupada">
        <i class="fas fa-music"></i>
        <span>Listen to Kirtan</span>
      </button>
      <div class="kirtan-panel" id="kirtan-panel" aria-hidden="true">
        <div class="kirtan-panel-header">
          <div class="kirtan-panel-title">
            <i class="fas fa-om"></i>
            <span>Kirtan by Srila Prabhupada</span>
          </div>
          <button class="kirtan-close" id="kirtan-close" aria-label="Close player">&times;</button>
        </div>
        <div class="kirtan-panel-body">
          <div class="kirtan-mantra">Hare Krishna Hare Krishna · Krishna Krishna Hare Hare</div>
          <div id="kirtan-iframe-wrap">
            <iframe
              id="kirtan-iframe"
              src=""
              data-src="https://www.youtube.com/embed/ubbT9Jm4DOs?autoplay=1&start=61&rel=0&modestbranding=1"
              title="Kirtan by Srila Prabhupada"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
          <a href="https://www.youtube.com/@ISKCONBangaloreMusic" target="_blank" rel="noopener" class="kirtan-channel-link">
            <i class="fab fa-youtube"></i> ISKCON Bangalore Music Channel
          </a>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = playerHTML.trim();
  document.body.appendChild(wrapper.firstElementChild);

  const toggle   = document.getElementById('kirtan-toggle');
  const panel    = document.getElementById('kirtan-panel');
  const closeBtn = document.getElementById('kirtan-close');
  const iframe   = document.getElementById('kirtan-iframe');
  let   isOpen   = false;

  function openPlayer() {
    isOpen = true;
    panel.removeAttribute('aria-hidden');
    panel.classList.add('open');
    toggle.classList.add('active');
    // Lazy-load the iframe only when user opens the player
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = iframe.dataset.src;
    }
  }

  function closePlayer() {
    isOpen = false;
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('open');
    toggle.classList.remove('active');
    // Stop video by clearing src
    iframe.src = '';
  }

  toggle.addEventListener('click', function () {
    if (isOpen) { closePlayer(); } else { openPlayer(); }
  });

  closeBtn.addEventListener('click', closePlayer);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closePlayer();
  });

})();
