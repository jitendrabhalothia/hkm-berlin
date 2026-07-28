(function () {
  'use strict';

  // ── 8 BLESSINGS — every one a Bhagavad Gita verse + Srila Prabhupada purport ──
  const blessings = [
    {
      icon: '🙏',
      label: 'Surrender',
      color: '#8b5cf6',
      verse: 'BG 18.66',
      quote: '"Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."',
      text: '{name}, Lord Krishna\'s message for you today is complete Surrender. Give up all anxiety — He promises to personally protect you. Simply chant His holy names: Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare. 🙏'
    },
    {
      icon: '💛',
      label: 'Divine Love',
      color: '#f97316',
      verse: 'BG 10.10',
      quote: '"To those who are constantly devoted to serving Me with love, I give the understanding by which they can come to Me."',
      text: '{name}, Lord Krishna is opening the door of Divine Love in your heart. He personally guides those who serve Him with devotion. This is the highest gift — prema, pure love for God. Come join us every Saturday and cultivate this love together. 💛'
    },
    {
      icon: '☮️',
      label: 'Peace',
      color: '#3b82f6',
      verse: 'BG 5.29',
      quote: '"The sages, knowing Me as the ultimate purpose of all sacrifices and austerities, the Supreme Lord of all planets and demigods, attain peace from the pangs of material miseries."',
      text: '{name}, Lord Krishna blesses you with true Peace today. Śrīla Prabhupāda teaches that real peace comes only by knowing Krishna as the enjoyer of all and the friend of all living entities. Chant His names and feel that peace within. ☮️'
    },
    {
      icon: '🌟',
      label: 'Knowledge',
      color: '#f59e0b',
      verse: 'BG 4.38',
      quote: '"In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism."',
      text: '{name}, Lord Krishna is filling you with divine Knowledge today! Śrīla Prabhupāda writes that this transcendental knowledge purifies the soul more than anything. Open the Bhagavad Gita — even one verse can change your life forever. 🌟'
    },
    {
      icon: '🌺',
      label: 'Protection',
      color: '#10b981',
      verse: 'BG 9.22',
      quote: '"But those who always worship Me with exclusive devotion, meditating on My transcendental form — to them I carry what they lack, and I preserve what they have."',
      text: '{name}, Lord Krishna Himself is your protector! He personally carries what you need and preserves what you have. Śrīla Prabhupāda calls this the most wonderful promise in all of scripture. Trust in Krishna — He never abandons His devotee. 🌺'
    },
    {
      icon: '🔱',
      label: 'Fearlessness',
      color: '#ef4444',
      verse: 'BG 2.20',
      quote: '"The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval."',
      text: '{name}, Lord Krishna dissolves all fear with this eternal truth — you are the immortal soul, never born, never dying. Śrīla Prabhupāda says: "One who knows this is not disturbed by anything." Go forward today with courage and full faith in Krishna. 🔱'
    },
    {
      icon: '🪔',
      label: 'Devotion',
      color: '#e84393',
      verse: 'BG 8.7',
      quote: '"Therefore, Arjuna, you should always think of Me in the form of Krishna and at the same time carry out your prescribed duty of fighting. With your activities dedicated to Me and your mind and intelligence fixed on Me, you will attain Me without doubt."',
      text: '{name}, Lord Krishna invites you to always think of Him in all activities. This is the highest yoga — Bhakti. Śrīla Prabhupāda taught that even a moment of remembering Krishna is a step towards liberation. Chant today: Hare Krishna Hare Krishna! 🪔'
    },
    {
      icon: '🌈',
      label: 'Liberation',
      color: '#06b6d4',
      verse: 'BG 4.9',
      quote: '"One who knows the transcendental nature of My appearance and activities does not, upon leaving the body, take his birth again in this material world, but attains My eternal abode."',
      text: '{name}, Lord Krishna promises you the highest destination — His eternal abode! Śrīla Prabhupāda writes that simply by understanding Krishna\'s divine nature, one is liberated. This life is your golden opportunity — begin your Bhakti journey today. 🌈'
    }
  ];

  const canvas = document.getElementById('blessingWheel');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const numSegments = blessings.length;
  const arcSize = (2 * Math.PI) / numSegments;
  const radius = canvas.width / 2;
  let currentAngle = 0;
  let spinning = false;

  const nameInput = document.getElementById('devoteeName');
  const spinBtn   = document.getElementById('spinBtn');
  const hintEl    = document.getElementById('wheelHint');

  nameInput.addEventListener('input', function () {
    const val = this.value.trim();
    if (val.length > 0) {
      spinBtn.disabled = false;
      hintEl.textContent = 'Click the button or the wheel to spin!';
      hintEl.style.color = '#f5c842';
    } else {
      spinBtn.disabled = true;
      hintEl.textContent = 'Type your name above to receive your blessing';
      hintEl.style.color = '';
    }
  });

  nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !spinBtn.disabled) startSpin();
  });

  function drawWheel(angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer glow ring
    ctx.save();
    ctx.shadowColor = '#f5c842';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, 2 * Math.PI);
    ctx.strokeStyle = '#f5c842';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < numSegments; i++) {
      const startAngle = angle + i * arcSize;
      const endAngle   = startAngle + arcSize;
      const b = blessings[i];

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 8, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = b.color;
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';

      ctx.font = '22px serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(b.icon, radius - 18, 7);

      ctx.font = 'bold 11px Lato, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(b.label, radius - 46, 7);

      ctx.restore();
    }

    // Center white circle
    ctx.beginPath();
    ctx.arc(radius, radius, 44, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#f5c842';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawWheel(currentAngle);

  canvas.addEventListener('click', function () {
    if (!spinBtn.disabled) startSpin();
  });
  spinBtn.addEventListener('click', startSpin);

  function startSpin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    nameInput.disabled = true;

    const totalRotation = (Math.random() * 4 + 6) * 2 * Math.PI;
    const duration      = 4000 + Math.random() * 1500;
    const startTime     = performance.now();
    const startAngle    = currentAngle;

    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

    function animate(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentAngle   = startAngle + totalRotation * easeOut(progress);
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        nameInput.disabled = false;
        spinBtn.disabled = nameInput.value.trim().length === 0;
        showBlessing();
      }
    }

    requestAnimationFrame(animate);
  }

  function showBlessing() {
    const name       = nameInput.value.trim() || 'Dear Devotee';
    const normalised = (((-currentAngle - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const index      = Math.floor(normalised / arcSize) % numSegments;
    const b          = blessings[index];
    const fullText   = b.text.replace(/\{name\}/g, name);

    document.getElementById('blessingIcon').textContent  = b.icon;
    document.getElementById('blessingLabel').textContent = b.verse;
    document.getElementById('blessingTitle').textContent = name + ' — ' + b.label;
    document.getElementById('blessingQuote').textContent = b.quote;
    document.getElementById('blessingText').textContent  = fullText;

    const msg = encodeURIComponent(
      b.icon + ' Krishna\'s Gita Blessing for ' + name + ': ' + b.label + '!\n\n' +
      b.quote + '\n— ' + b.verse + '\n\n' +
      fullText +
      '\n\n──────────────────────\n' +
      '🎡 Spin the wheel & get YOUR blessing:\n👉 bhaktiyogagermany.de\n' +
      '──────────────────────\n' +
      'Hare Krishna! 🙏'
    );
    document.getElementById('shareWhatsApp').href = 'https://wa.me/?text=' + msg;

    document.querySelector('.blessing-modal-inner').style.borderTop = '5px solid ' + b.color;
    document.getElementById('blessingIcon').style.background  = b.color + '22';
    document.getElementById('blessingIcon').style.borderColor = b.color;

    document.getElementById('blessingModal').classList.add('active');
    document.getElementById('blessingOverlay').classList.add('active');
  }

  document.getElementById('closeBlessingModal').addEventListener('click', closeModal);
  document.getElementById('blessingOverlay').addEventListener('click', closeModal);

  function closeModal() {
    document.getElementById('blessingModal').classList.remove('active');
    document.getElementById('blessingOverlay').classList.remove('active');
  }

})();
