(function () {
  'use strict';

  const blessings = [
    {
      icon: '🌸',
      label: 'Joy',
      color: '#e84393',
      text: 'Lord Jagannath blesses you with boundless joy! Come dance and sing His holy names at Ratha Yatra in Berlin. Your happiness will inspire everyone around you.'
    },
    {
      icon: '☮️',
      label: 'Peace',
      color: '#3b82f6',
      text: 'Lord Jagannath grants you deep inner peace. His chariot carries away all worries and anxieties. Surrender everything to Him and experience true tranquillity.'
    },
    {
      icon: '🌟',
      label: 'Prosperity',
      color: '#f59e0b',
      text: 'Lord Jagannath showers you with abundance and blessings. Seeing His chariot destroys all misfortune. Come to Ratha Yatra and receive His infinite mercy.'
    },
    {
      icon: '🙏',
      label: 'Devotion',
      color: '#8b5cf6',
      text: 'Lord Jagannath is awakening pure devotion in your heart. Chant Hare Krishna and be happy! This Ratha Yatra is your golden opportunity to deepen your love for the Lord.'
    },
    {
      icon: '🌺',
      label: 'Healing',
      color: '#10b981',
      text: 'Lord Jagannath heals body, mind, and soul. His sacred prasadam purifies everything it touches. Come receive His healing grace at Ratha Yatra on 18 July.'
    },
    {
      icon: '🔱',
      label: 'Protection',
      color: '#ef4444',
      text: 'Lord Jagannath is protecting you and your family. Take shelter under His divine chariot and fear nothing. He watches over all who come to Him with an open heart.'
    },
    {
      icon: '💛',
      label: 'Divine Love',
      color: '#f97316',
      text: 'Lord Jagannath fills your heart with divine love — the highest treasure in all creation. Come celebrate this love with 1000+ devotees at Berlin Ratha Yatra!'
    },
    {
      icon: '🌈',
      label: 'Liberation',
      color: '#06b6d4',
      text: '"Seeing Lord Jagannath\'s Ratha Yatra destroys all sinful reactions." — Brahmanda Purana. This Ratha Yatra on 18 July is your moment of liberation. Do not miss it!'
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
      const endAngle = startAngle + arcSize;
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

      // Icon
      ctx.font = '22px serif';
      ctx.fillText(b.icon, radius - 18, 7);

      // Label
      ctx.font = 'bold 12px Lato, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(b.label, radius - 46, 7);

      ctx.restore();
    }

    // Center circle (white cover for the image overlay)
    ctx.beginPath();
    ctx.arc(radius, radius, 44, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#f5c842';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawWheel(currentAngle);

  // Click on canvas to spin
  canvas.addEventListener('click', startSpin);
  document.getElementById('spinBtn').addEventListener('click', startSpin);

  function startSpin() {
    if (spinning) return;
    spinning = true;
    document.getElementById('spinBtn').disabled = true;

    const totalRotation = (Math.random() * 4 + 6) * 2 * Math.PI; // 6-10 full rotations
    const duration = 4000 + Math.random() * 1500; // 4-5.5 seconds
    const startTime = performance.now();
    const startAngle = currentAngle;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      currentAngle = startAngle + totalRotation * eased;
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        document.getElementById('spinBtn').disabled = false;
        showBlessing();
      }
    }

    requestAnimationFrame(animate);
  }

  function showBlessing() {
    // Calculate which segment is at the top (pointer at top = -PI/2)
    const normalised = (((-currentAngle - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const index = Math.floor(normalised / arcSize) % numSegments;
    const b = blessings[index];

    document.getElementById('blessingIcon').textContent = b.icon;
    document.getElementById('blessingLabel').textContent = b.label;
    document.getElementById('blessingTitle').textContent = 'Lord Jagannath Blesses You with ' + b.label;
    document.getElementById('blessingText').textContent = b.text;

    // WhatsApp share
    const msg = encodeURIComponent(
      b.icon + ' Lord Jagannath blesses me with ' + b.label + '!\n\n"' + b.text +
      '"\n\nCome to Berlin Ratha Yatra 2026 — 18 July! 🎡\nharekrishnaberlin.de'
    );
    document.getElementById('shareWhatsApp').href = 'https://wa.me/?text=' + msg;

    // Modal background color
    document.querySelector('.blessing-modal-inner').style.borderTop = '5px solid ' + b.color;
    document.getElementById('blessingIcon').style.background = b.color + '22';
    document.getElementById('blessingIcon').style.borderColor = b.color;

    document.getElementById('blessingModal').classList.add('active');
    document.getElementById('blessingOverlay').classList.add('active');
  }

  document.getElementById('closeBlessingModal').addEventListener('click', function () {
    document.getElementById('blessingModal').classList.remove('active');
    document.getElementById('blessingOverlay').classList.remove('active');
  });
  document.getElementById('blessingOverlay').addEventListener('click', function () {
    document.getElementById('blessingModal').classList.remove('active');
    document.getElementById('blessingOverlay').classList.remove('active');
  });

})();
