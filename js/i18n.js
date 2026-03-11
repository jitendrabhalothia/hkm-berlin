/* ============================================================
   HARE KRISHNA MOVEMENT BERLIN — i18n.js
   English (EN) / German (DE) language switcher
   Default: English. Preference stored in localStorage.
   ============================================================ */

(function () {

  /* ── All translations ── */
  var T = {
    en: {
      /* NAV */
      'nav.home':        'Home',
      'nav.prabhupada':  'Srila Prabhupada',
      'nav.bhakti':      'Bhakti Yoga',
      'nav.programs':    'Programs',
      'nav.gita':        'Bhagavad Gita',
      'nav.gallery':     'Gallery',
      'nav.about':       'About HKM',
      'nav.contact':     'Contact',

      /* FOOTER */
      'footer.pages':    'Pages',
      'footer.programs': 'Programs',
      'footer.visit':    'Visit Us',
      'footer.sat1':     'Saturday Kirtan – 4 PM',
      'footer.sat2':     'Bhagavad-Gita – 4:30 PM',
      'footer.sat3':     'Free Prasadam – 6 PM',
      'footer.ekadashi': 'Ekadashi Chanting',
      'footer.festivals':'Festivals',
      'footer.tagline':  'Dedicated to spreading the teachings of Srila Prabhupada and Bhakti Yoga in Berlin.',
      'footer.copy':     '© {year} Hare Krishna Movement Berlin. All rights reserved.',

      /* HERO (index) */
      'hero.tagline':    'Bhakti Yoga • Mantra Meditation • Bhagavad-Gita Wisdom',
      'hero.sub':        'Dedicated to the teachings of<br><strong>His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</strong>',
      'hero.schedule':   '<i class="fas fa-calendar-alt" style="margin-right:.3rem;color:var(--gold-light);"></i>Every <strong>Saturday from 4 PM</strong> &mdash; Kirtan &middot; Bhagavad-Gita &middot; Free Prasadam<br><i class="fas fa-map-marker-alt" style="margin-right:.3rem;color:var(--gold-light);"></i>Ritterlandweg 16, Berlin &mdash; <strong>All are welcome, free of charge</strong>',
      'hero.btn1':       'Join This Saturday',
      'hero.btn2':       'Get Directions',

      /* PROG BAR */
      'prog.every':      'Every Saturday',
      'prog.berlin':     'Berlin Program',
      'prog.kirtan':     'Kirtan',
      'prog.kirtan.time':'4:00 PM',
      'prog.gita':       'Bhagavad-Gita',
      'prog.gita.time':  '4:30 PM',
      'prog.qa':         'Q & A',
      'prog.qa.time':    '5:30 PM',
      'prog.prasadam':   'Free Prasadam',
      'prog.prasadam.time':'6:00 PM',
      'prog.btn':        'Ritterlandweg 16',

      /* MANTRA SECTION */
      'mantra.label':    'The Hare Krishna Maha-Mantra',
      'mantra.sub':      '"Chant Hare Krishna and be happy."',

      /* CHANT SLIDER */
      'slide1.label':    'The Hare Krishna Maha-Mantra',
      'slide1.desc':     'Chant these 16 names and experience peace, joy, and spiritual awakening.',
      'slide2.label':    "Srila Prabhupada's Message",
      'slide2.h2':       'Chant Hare Krishna<br><em>and Be Happy</em>',
      'slide2.desc':     'The simplest yoga for this age — available to everyone, anywhere, at any time.',
      'slide2.btn':      'Discover Bhakti Yoga',
      'slide3.label':    'Every Saturday in Berlin',
      'slide3.h2':       'Join Our Kirtan',
      'slide3.desc':     'Live chanting every Saturday at 4:00 PM — no experience required. All welcome.',
      'slide3.btn':      'See Programs',
      'slide4.label':    'Free Every Saturday at 6 PM',
      'slide4.h2':       'Free Prasadam<br><em>Ritterlandweg 16</em>',
      'slide4.desc':     'Sanctified vegetarian food offered to Krishna — nourishing body, mind and soul.',
      'slide4.btn':      'Get Directions',
      'slide5.label':    'Words of Wisdom',

      /* 4 PILLARS */
      'pillars.h2':      'What We Practice',
      'pillars.sub':     'Four pillars of Bhakti Yoga at our Berlin community — all are welcome, free of charge',
      'pillar1.h3':      'Kirtan',
      'pillar1.p':       'Congregational chanting of the Hare Krishna mantra every Saturday at 4 PM.',
      'pillar2.h3':      'Bhagavad-Gita',
      'pillar2.p':       "Weekly study of the Gita As It Is — Srila Prabhupada's exact commentary.",
      'pillar3.h3':      'Meditation',
      'pillar3.p':       'Mantra meditation on japa beads — peaceful practice for body and mind.',
      'pillar4.h3':      'Free Prasadam',
      'pillar4.p':       'Sanctified vegetarian food shared every Saturday at 6 PM. Everyone welcome.',

      /* PRABHUPADA PAGE — timeline */
      'sp.6':            'A Life Dedicated to Lord Krishna',
      'sp.36':           'On November 14, 1977, Srila Prabhupada left this world physically in Vrindavana, India — the holy land of Krishna — surrounded by his loving disciples, leaving behind an eternal spiritual legacy.',

      /* PRABHUPADA SECTION */
      'sp.label':        'Our Spiritual Master',
      'sp.h2':           'Dedicated to Srila Prabhupada',
      'sp.p1':           'The Hare Krishna Movement Berlin follows <strong>His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</strong> as our eternal Diksha Guru and Founder-Acharya. Everything we teach and practice is directly based on his books, lectures, and instructions.',
      'sp.p2':           'Come as you are — no membership, no fees, no prior knowledge needed. Just an open heart and a willingness to chant.',
      'sp.btn1':         'About Srila Prabhupada',
      'sp.btn2':         'Find Us',

      /* CTA */
      'cta.h2':          'You Are Invited This Saturday',
      'cta.p':           'Come as you are — no membership, no fees, no experience needed.<br>Just an open heart. <strong>Ritterlandweg 16, Berlin · Every Saturday from 4 PM</strong>',
      'cta.btn1':        'See the Schedule',
      'cta.btn2':        'Get Directions',

      /* PAGE HEROES */
      'ph.prabhupada.h1':  'His Divine Grace Srila Prabhupada',
      'ph.prabhupada.p':   'Founder-Acharya of the International Society for Krishna Consciousness (ISKCON)',
      'ph.bhakti.h1':      'Bhakti Yoga',
      'ph.bhakti.p':       'The Path of Devotional Service',
      'ph.programs.h1':    'Programs in Berlin',
      'ph.programs.p':     'Join us every Saturday — all are welcome',
      'ph.gita.h1':        'Bhagavad-Gita Study',
      'ph.gita.p':         'The Song of God — As It Is',
      'ph.gallery.h1':     'Gallery',
      'ph.gallery.p':      'Kirtan, Prasadam & Community Life in Berlin',
      'ph.contact.h1':     'Contact & Visit Us',
      'ph.contact.p':      'Come and chant with us in Berlin',
      'ph.about.h1':       "Srila Prabhupada's Hare Krishna Movement",
      'ph.about.p':        'Global Centers — spreading Bhakti Yoga to every town and village',

      /* ABOUT HKM */
      'about.guru.h2':   'Our Eternal Spiritual Master',
      'about.guru.p':    '<strong>His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</strong> is our Founder-Acharya and eternal Diksha Guru. Every centre of the Hare Krishna Movement is dedicated to his instructions and his books.',
      'about.centers.h2':  'Some of Our Temples Worldwide',
      'about.centers.sub': 'By the mercy of <strong>His Divine Grace Srila Prabhupada</strong>, over <strong>70 Hare Krishna Movement temples</strong> have been established across India and around the world. Each one stands as a living testimony to his vision — that every town and village should hear the holy name of Krishna.',
      'about.centers.note':'These are <em>some</em> of those temples. Come visit us in Berlin — we are part of this same worldwide family, dedicated to the same mission.',
      'about.cta.h2':    'Join Us in Berlin',
      'about.cta.p':     'Every Saturday · Ritterlandweg 16, Berlin · Free prasadam at 6 PM',

      /* CONTACT */
      'contact.cta.h2':  'Come and Chant with Us',
      'contact.cta.p':   'Every Saturday in Berlin — free admission, free prasadam',
    },

    de: {
      /* NAV */
      'nav.home':        'Startseite',
      'nav.prabhupada':  'Srila Prabhupada',
      'nav.bhakti':      'Bhakti Yoga',
      'nav.programs':    'Programme',
      'nav.gita':        'Bhagavad Gita',
      'nav.gallery':     'Galerie',
      'nav.about':       'Über HKM',
      'nav.contact':     'Kontakt',

      /* FOOTER */
      'footer.pages':    'Seiten',
      'footer.programs': 'Programme',
      'footer.visit':    'Besuche uns',
      'footer.sat1':     'Samstags-Kirtan – 16:00 Uhr',
      'footer.sat2':     'Bhagavad-Gita – 16:30 Uhr',
      'footer.sat3':     'Freies Prasadam – 18:00 Uhr',
      'footer.ekadashi': 'Ekadashi-Gesang',
      'footer.festivals':'Feste',
      'footer.tagline':  'Gewidmet der Verbreitung von Srila Prabhupadas Lehren und Bhakti Yoga in Berlin.',
      'footer.copy':     '© {year} Hare Krishna Movement Berlin. Alle Rechte vorbehalten.',

      /* HERO (index) */
      'hero.tagline':    'Bhakti Yoga • Mantra-Meditation • Bhagavad-Gita Weisheit',
      'hero.sub':        'Gewidmet den Lehren<br><strong>Seiner Göttlichen Gnade A.C. Bhaktivedanta Swami Srila Prabhupada</strong>',
      'hero.schedule':   '<i class="fas fa-calendar-alt" style="margin-right:.3rem;color:var(--gold-light);"></i>Jeden <strong>Samstag ab 16:00 Uhr</strong> &mdash; Kirtan &middot; Bhagavad-Gita &middot; Freies Prasadam<br><i class="fas fa-map-marker-alt" style="margin-right:.3rem;color:var(--gold-light);"></i>Ritterlandweg 16, Berlin &mdash; <strong>Alle sind willkommen, kostenlos</strong>',
      'hero.btn1':       'Diesen Samstag kommen',
      'hero.btn2':       'Wegbeschreibung',

      /* PROG BAR */
      'prog.every':      'Jeden Samstag',
      'prog.berlin':     'Berlin Programm',
      'prog.kirtan':     'Kirtan',
      'prog.kirtan.time':'16:00 Uhr',
      'prog.gita':       'Bhagavad-Gita',
      'prog.gita.time':  '16:30 Uhr',
      'prog.qa':         'Fragen & Antworten',
      'prog.qa.time':    '17:30 Uhr',
      'prog.prasadam':   'Freies Prasadam',
      'prog.prasadam.time':'18:00 Uhr',
      'prog.btn':        'Ritterlandweg 16',

      /* MANTRA SECTION */
      'mantra.label':    'Das Hare Krishna Maha-Mantra',
      'mantra.sub':      '„Chante Hare Krishna und sei glücklich."',

      /* CHANT SLIDER */
      'slide1.label':    'Das Hare Krishna Maha-Mantra',
      'slide1.desc':     'Singe diese 16 heiligen Namen und erlebe Frieden, Freude und spirituelles Erwachen.',
      'slide2.label':    'Srila Prabhupadas Botschaft',
      'slide2.h2':       'Chante Hare Krishna<br><em>und sei glücklich</em>',
      'slide2.desc':     'Der einfachste Yoga für dieses Zeitalter — für jeden, überall und jederzeit verfügbar.',
      'slide2.btn':      'Bhakti Yoga entdecken',
      'slide3.label':    'Jeden Samstag in Berlin',
      'slide3.h2':       'Komm zum Kirtan',
      'slide3.desc':     'Live-Kirtan jeden Samstag um 16:00 Uhr — keine Erfahrung nötig. Alle willkommen.',
      'slide3.btn':      'Programme ansehen',
      'slide4.label':    'Jeden Samstag kostenlos um 18:00 Uhr',
      'slide4.h2':       'Freies Prasadam<br><em>Ritterlandweg 16</em>',
      'slide4.desc':     'Geheiligte vegetarische Speisen, die Krishna angeboten werden — nährend für Körper, Geist und Seele.',
      'slide4.btn':      'Wegbeschreibung',
      'slide5.label':    'Worte der Weisheit',

      /* 4 PILLARS */
      'pillars.h2':      'Was wir praktizieren',
      'pillars.sub':     'Vier Säulen des Bhakti Yoga in unserer Berliner Gemeinschaft — alle willkommen, kostenlos',
      'pillar1.h3':      'Kirtan',
      'pillar1.p':       'Gemeinsamer Gesang des Hare Krishna Mantras jeden Samstag um 16:00 Uhr.',
      'pillar2.h3':      'Bhagavad-Gita',
      'pillar2.p':       'Wöchentliches Studium der Gita wie sie ist — Srila Prabhupadas originaler Kommentar.',
      'pillar3.h3':      'Meditation',
      'pillar3.p':       'Mantra-Meditation auf Japa-Perlen — friedvolle Praxis für Körper und Geist.',
      'pillar4.h3':      'Freies Prasadam',
      'pillar4.p':       'Geheiligte vegetarische Speisen jeden Samstag um 18:00 Uhr. Alle willkommen.',

      /* PRABHUPADA SECTION */
      /* PRABHUPADA PAGE — timeline */
      'sp.6':            'Ein Leben gewidmet Lord Krishna',
      'sp.36':           'Am 14. November 1977 verließ Srila Prabhupada diese Welt körperlich in Vrindavana, Indien — dem heiligen Land Krishnas — umgeben von seinen liebevollen Schülern und hinterließ ein ewiges spirituelles Erbe.',

      'sp.label':        'Unser spiritueller Meister',
      'sp.h2':           'Gewidmet Srila Prabhupada',
      'sp.p1':           'Das Hare Krishna Movement Berlin folgt <strong>Seiner Göttlichen Gnade A.C. Bhaktivedanta Swami Srila Prabhupada</strong> als unserem ewigen Diksha Guru und Gründer-Acharya. Alles, was wir lehren und praktizieren, basiert direkt auf seinen Büchern, Vorträgen und Anweisungen.',
      'sp.p2':           'Komm wie du bist — keine Mitgliedschaft, keine Kosten, kein Vorwissen nötig. Nur ein offenes Herz und die Bereitschaft zu singen.',
      'sp.btn1':         'Über Srila Prabhupada',
      'sp.btn2':         'Uns finden',

      /* CTA */
      'cta.h2':          'Du bist diesen Samstag eingeladen',
      'cta.p':           'Komm wie du bist — keine Mitgliedschaft, keine Kosten, keine Erfahrung nötig.<br>Nur ein offenes Herz. <strong>Ritterlandweg 16, Berlin · Jeden Samstag ab 16:00 Uhr</strong>',
      'cta.btn1':        'Programm ansehen',
      'cta.btn2':        'Wegbeschreibung',

      /* PAGE HEROES */
      'ph.prabhupada.h1':  'Seine Göttliche Gnade Srila Prabhupada',
      'ph.prabhupada.p':   'Gründer-Acharya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
      'ph.bhakti.h1':      'Bhakti Yoga',
      'ph.bhakti.p':       'Der Weg des hingebungsvollen Dienstes',
      'ph.programs.h1':    'Programme in Berlin',
      'ph.programs.p':     'Komm jeden Samstag — alle sind willkommen',
      'ph.gita.h1':        'Bhagavad-Gita Studium',
      'ph.gita.p':         'Das Lied Gottes — So wie es ist',
      'ph.gallery.h1':     'Galerie',
      'ph.gallery.p':      'Kirtan, Prasadam & Gemeinschaftsleben in Berlin',
      'ph.contact.h1':     'Kontakt & Besuche uns',
      'ph.contact.p':      'Komm und singe mit uns in Berlin',
      'ph.about.h1':       'Srila Prabhupadas Hare Krishna Bewegung',
      'ph.about.p':        'Weltweite Zentren — Bhakti Yoga in jede Stadt und jedes Dorf bringen',

      /* ABOUT HKM */
      'about.guru.h2':   'Unser ewiger spiritueller Meister',
      'about.guru.p':    '<strong>Seine Göttliche Gnade A.C. Bhaktivedanta Swami Srila Prabhupada</strong> ist unser Gründer-Acharya und ewiger Diksha Guru. Jedes Zentrum der Hare Krishna Bewegung ist seinen Anweisungen und Büchern gewidmet.',
      'about.centers.h2':  'Einige unserer Tempel weltweit',
      'about.centers.sub': 'Durch die Gnade von <strong>Seiner Göttlichen Gnade Srila Prabhupada</strong> wurden über <strong>70 Hare Krishna Bewegungs-Tempel</strong> in Indien und auf der ganzen Welt errichtet. Jeder ist ein lebendiges Zeugnis seiner Vision — dass jede Stadt und jedes Dorf den heiligen Namen Krishnas hören soll.',
      'about.centers.note':'Dies sind <em>einige</em> dieser Tempel. Besuche uns in Berlin — wir sind Teil dieser weltweiten Familie.',
      'about.cta.h2':    'Komm zu uns in Berlin',
      'about.cta.p':     'Jeden Samstag · Ritterlandweg 16, Berlin · Freies Prasadam um 18:00 Uhr',

      /* CONTACT */
      'contact.cta.h2':  'Komm und singe mit uns',
      'contact.cta.p':   'Jeden Samstag in Berlin — freier Eintritt, freies Prasadam',
    }
  };

  /* ── Apply translations to page ── */
  function apply(lang) {
    var t = T[lang] || T['en'];
    var year = new Date().getFullYear();

    /* Text nodes */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key].replace('{year}', year);
    });

    /* HTML nodes (contain tags like <strong>, <em>, <i>) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key].replace('{year}', year);
    });

    /* Save + mark html lang */
    localStorage.setItem('hkm-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    /* Update switcher active state */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  /* ── Inject EN | DE switcher into every navbar ── */
  function injectSwitcher() {
    document.querySelectorAll('.nav-inner').forEach(function (navInner) {
      if (navInner.querySelector('.lang-switcher')) return; // already added
      var sw = document.createElement('div');
      sw.className = 'lang-switcher';
      sw.innerHTML =
        '<button class="lang-btn active" data-lang="en">EN</button>' +
        '<span class="lang-sep">|</span>' +
        '<button class="lang-btn" data-lang="de">DE</button>';
      var toggle = navInner.querySelector('.nav-toggle');
      navInner.insertBefore(sw, toggle || null);

      sw.addEventListener('click', function (e) {
        var btn = e.target.closest('.lang-btn');
        if (btn) apply(btn.getAttribute('data-lang'));
      });
    });
  }

  /* ── Boot ── */
  function init() {
    injectSwitcher();
    var saved = localStorage.getItem('hkm-lang') || 'en';
    apply(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
