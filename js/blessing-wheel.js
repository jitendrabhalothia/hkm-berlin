(function () {
  'use strict';

  const blessings = [
    {
      icon: '🌸',
      label: 'Joy',
      color: '#e84393',
      text: '{name}, Lord Jagannath blesses you with boundless Joy! Come dance and sing His holy names at Ratha Yatra in Berlin on 18 July. Your happiness will light up the whole procession!'
    },
    {
      icon: '☮️',
      label: 'Peace',
      color: '#3b82f6',
      text: '{name}, Lord Jagannath grants you deep inner Peace. His chariot carries away all worries and anxieties. Surrender everything to Him and experience true tranquillity at Ratha Yatra.'
    },
    {
      icon: '🌟',
      label: 'Prosperity',
      color: '#f59e0b',
      text: '{name}, Lord Jagannath showers you with Prosperity and blessings! Seeing His chariot destroys all misfortune. Come to Ratha Yatra on 18 July and receive His infinite mercy.'
    },
    {
      icon: '🙏',
      label: 'Devotion',
      color: '#8b5cf6',
      text: '{name}, Lord Jagannath is awakening pure Devotion in your heart. Chant Hare Krishna and be happy! This Ratha Yatra is your golden opportunity to deepen your love for the Lord.'
    },
    {
      icon: '🌺',
      label: 'Healing',
      color: '#10b981',
      text: '{name}, Lord Jagannath blesses you with Healing for body, mind, and soul. His sacred prasadam purifies everything it touches. Come receive His healing grace at Ratha Yatra on 18 July.'
    },
    {
      icon: '🔱',
      label: 'Protection',
      color: '#ef4444',
      text: '{name}, Lord Jagannath is watching over you with His Protection. Take shelter under His divine chariot and fear nothing. He guards all who come to Him with an open heart.'
    },
    {
      icon: '💛',
      label: 'Divine Love',
      color: '#f97316',
      text: '{name}, Lord Jagannath fills your heart with Divine Love — the highest treasure in all creation. Come celebrate this love with 1000+ devotees at Berlin Ratha Yatra on 18 July!'
    },
    {
      icon: '🌈',
      label: 'Liberation',
      color: '#06b6d4',
      text: '{name}, the scriptures say: "Seeing Lord Jagannath\'s Ratha Yatra destroys all sinful reactions." — Brahmanda Purana. This 18 July is your moment of Liberation. Do not miss it!'
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

  // Enable/disable spin button based on name input
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
      hintEl.textContent = 'Type your name above to spin the wheel';
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

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 8, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = b.color;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Icon + label text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';

      ctx.font = '22px serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(b.icon, radius - 18, 7);

      ctx.font = 'bold 12px Lato, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(b.label, radius - 46, 7);

      ctx.restore();
    }

    // Center white circle for image overlay
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
    document.getElementById('blessingLabel').textContent = b.label;
    document.getElementById('blessingTitle').textContent = name + ', Lord Jagannath blesses you with ' + b.label + '!';
    document.getElementById('blessingText').textContent  = fullText;

    // WhatsApp share
    const msg = encodeURIComponent(
      b.icon + ' ' + name + ', Lord Jagannath blesses you with ' + b.label + '!\n\n' +
      fullText +
      '\n\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n' +
      '\uD83C\uDFA1 Spin the wheel & get YOUR blessing:\n\uD83D\uDC49 harekrishnaberlin.de\n\n' +
      '\uD83D\uDE4F Want to serve at Ratha Yatra?\n\uD83D\uDC49 harekrishnaberlin.de/volunteer.html\n' +
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n' +
      'Berlin Ratha Yatra \u2014 18 July 2026'
    );
    document.getElementById('shareWhatsApp').href = 'https://wa.me/?text=' + msg;

    document.querySelector('.blessing-modal-inner').style.borderTop = '5px solid ' + b.color;
    document.getElementById('blessingIcon').style.background   = b.color + '22';
    document.getElementById('blessingIcon').style.borderColor  = b.color;

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
