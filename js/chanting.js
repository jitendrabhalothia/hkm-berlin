/* ============================================================
   HARE KRISHNA MOVEMENT BERLIN — chanting.js
   Welcome overlay + soft background chanting player
   YouTube video: Kt21pBgL2aw (Srila Prabhupada kirtan)
   Volume: very low (20%) — respectful for Germany
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     MANTRA LINES — animated subtitles in overlay + player
     ---------------------------------------------------------- */
  var MANTRA = [
    'Hare Krishna Hare Krishna',
    'Krishna Krishna Hare Hare',
    'Hare Rama Hare Rama',
    'Rama Rama Hare Hare'
  ];

  /* How long each subtitle line shows (ms) */
  var SUBTITLE_MS = 3000;

  /* ----------------------------------------------------------
     DOM ELEMENTS
     ---------------------------------------------------------- */
  var overlay    = document.getElementById('welcome-overlay');
  var enterBtn   = document.getElementById('welcome-enter');
  var skipBtn    = document.getElementById('welcome-skip');
  var player     = document.getElementById('chanting-player');
  var playBtn    = document.getElementById('chanting-play');
  var muteBtn    = document.getElementById('chanting-mute');
  var closeBtn   = document.getElementById('chanting-close');
  var subtitleEl = document.getElementById('chanting-subtitle');
  var ytFrame    = document.getElementById('yt-chanting');

  /* Overlay mantra line elements */
  var wLines = [0,1,2,3].map(function(i){ return document.getElementById('wml-'+i); });

  var overlayTimer  = null;
  var subtitleTimer = null;
  var lineIdx       = 0;
  var isPlaying     = false;
  var isMuted       = false;
  var ytReady       = false;

  /* ----------------------------------------------------------
     OVERLAY — animate mantra lines
     ---------------------------------------------------------- */
  function startOverlayAnim() {
    var i = 0;
    overlayTimer = setInterval(function () {
      wLines.forEach(function (el) { if (el) el.classList.remove('active'); });
      i = (i + 1) % wLines.length;
      if (wLines[i]) wLines[i].classList.add('active');
    }, SUBTITLE_MS);
  }

  /* ----------------------------------------------------------
     CLOSE OVERLAY — fade out then remove
     ---------------------------------------------------------- */
  function closeOverlay() {
    clearInterval(overlayTimer);
    if (!overlay) { showPlayer(); return; }

    overlay.style.transition = 'opacity 0.7s ease';
    overlay.style.opacity    = '0';
    overlay.style.pointerEvents = 'none';

    setTimeout(function () {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      showPlayer();
    }, 750);
  }

  /* ----------------------------------------------------------
     SHOW PLAYER BAR
     ---------------------------------------------------------- */
  function showPlayer() {
    if (!player) return;
    player.style.display = 'flex';
    /* Small delay so display:flex applies before transition */
    setTimeout(function () {
      player.classList.add('visible');
    }, 30);
    startSubtitles();
  }

  /* ----------------------------------------------------------
     LOAD YOUTUBE — load iframe src and set low volume via API
     ---------------------------------------------------------- */
  function loadYouTube() {
    if (!ytFrame) return;
    var src = ytFrame.getAttribute('data-src');
    if (!src) return;

    ytFrame.src = src;
    isPlaying   = true;
    updatePlayBtn();

    /* Wait for iframe to load, then set volume to 20% via postMessage */
    ytFrame.addEventListener('load', function () {
      ytReady = true;
      setYTVolume(55); /* Gentle volume — audible but not loud */
    });
  }

  /* Send command to YouTube IFrame API */
  function ytCommand(func, args) {
    if (!ytFrame || !ytFrame.contentWindow) return;
    ytFrame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: func, args: args || [] }),
      '*'
    );
  }

  function setYTVolume(vol) {
    /* YouTube IFrame API: setVolume(0-100) */
    ytCommand('setVolume', [vol]);
  }

  /* ----------------------------------------------------------
     PLAY / PAUSE toggle
     If YouTube not loaded yet, load it first then play
     ---------------------------------------------------------- */
  function togglePlay() {
    /* If YouTube not loaded yet — load and play now */
    if (!ytFrame || !ytFrame.src) {
      loadYouTube();
      return;
    }
    if (isPlaying) {
      ytCommand('pauseVideo');
      isPlaying = false;
    } else {
      ytCommand('playVideo');
      isPlaying = true;
    }
    updatePlayBtn();
  }

  /* ----------------------------------------------------------
     MUTE / UNMUTE
     ---------------------------------------------------------- */
  function toggleMute() {
    isMuted = !isMuted;
    ytCommand(isMuted ? 'mute' : 'unMute');
    if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
    if (muteBtn) muteBtn.title = isMuted ? 'Unmute' : 'Mute';
  }

  /* ----------------------------------------------------------
     UPDATE PLAY BUTTON ICON
     ---------------------------------------------------------- */
  function updatePlayBtn() {
    if (!playBtn) return;
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  /* ----------------------------------------------------------
     SUBTITLE ROTATION in the player bar
     ---------------------------------------------------------- */
  function startSubtitles() {
    clearInterval(subtitleTimer);
    lineIdx = 0;
    setSubtitle();
    subtitleTimer = setInterval(function () {
      lineIdx = (lineIdx + 1) % MANTRA.length;
      setSubtitle();
    }, SUBTITLE_MS);
  }

  function setSubtitle() {
    if (!subtitleEl) return;
    /* Reset animation */
    subtitleEl.style.animation = 'none';
    void subtitleEl.offsetWidth; /* reflow */
    subtitleEl.style.animation  = '';
    subtitleEl.textContent = MANTRA[lineIdx];
  }

  /* ----------------------------------------------------------
     CLOSE PLAYER
     ---------------------------------------------------------- */
  function closePlayer() {
    clearInterval(subtitleTimer);
    ytCommand('stopVideo');
    if (ytFrame) ytFrame.src = '';
    if (player) {
      player.classList.remove('visible');
      setTimeout(function () {
        if (player) player.style.display = 'none';
      }, 500);
    }
  }

  /* ----------------------------------------------------------
     BIND BUTTON EVENTS
     ---------------------------------------------------------- */
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      closeOverlay();
      /* Start YouTube after overlay begins fading */
      setTimeout(loadYouTube, 300);
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      closeOverlay();
      /* No audio — player bar still shows with subtitles only */
    });
  }

  if (playBtn)  playBtn.addEventListener('click',  togglePlay);
  if (muteBtn)  muteBtn.addEventListener('click',  toggleMute);
  if (closeBtn) closeBtn.addEventListener('click', closePlayer);

  /* Close overlay with Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.parentNode) {
      closeOverlay();
    }
  });

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    startOverlayAnim();
  });

})();
