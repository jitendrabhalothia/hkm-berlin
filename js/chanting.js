/* ============================================================
   HARE KRISHNA MOVEMENT BERLIN — chanting.js
   Welcome overlay + floating audio player with mantra subtitles
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     MANTRA LINES — displayed as rotating subtitles
     ---------------------------------------------------------- */
  var MANTRA_LINES = [
    'Hare Krishna Hare Krishna',
    'Krishna Krishna Hare Hare',
    'Hare Rama Hare Rama',
    'Rama Rama Hare Hare'
  ];

  /* Subtitle rotation interval in milliseconds */
  var SUBTITLE_INTERVAL = 2800;

  var currentLine  = 0;
  var subtitleTimer = null;
  var overlayMantraTimer = null;

  /* ----------------------------------------------------------
     ELEMENTS
     ---------------------------------------------------------- */
  var overlay        = document.getElementById('welcome-overlay');
  var enterBtn       = document.getElementById('welcome-enter');
  var skipBtn        = document.getElementById('welcome-skip');
  var player         = document.getElementById('chanting-player');
  var playBtn        = document.getElementById('chanting-play');
  var muteBtn        = document.getElementById('chanting-mute');
  var closeBtn       = document.getElementById('chanting-close');
  var subtitleEl     = document.getElementById('chanting-subtitle');
  var audio          = document.getElementById('chanting-audio');
  var ytFrame        = document.getElementById('yt-chanting');
  var progressWrap   = document.getElementById('chanting-progress-wrap');
  var progressBar    = document.getElementById('chanting-progress-bar');
  var timeEl         = document.getElementById('chanting-time');

  /* Overlay mantra lines */
  var overlayLines = [
    document.getElementById('wml-0'),
    document.getElementById('wml-1'),
    document.getElementById('wml-2'),
    document.getElementById('wml-3')
  ];

  var isPlaying = false;
  var isMuted   = false;
  var useYouTube = false;

  /* ----------------------------------------------------------
     OVERLAY MANTRA ANIMATION
     Cycles highlighted line on the welcome screen
     ---------------------------------------------------------- */
  function startOverlayMantra() {
    var lineIndex = 0;
    overlayMantraTimer = setInterval(function () {
      overlayLines.forEach(function (el) {
        if (el) el.classList.remove('active');
      });
      lineIndex = (lineIndex + 1) % overlayLines.length;
      if (overlayLines[lineIndex]) {
        overlayLines[lineIndex].classList.add('active');
      }
    }, SUBTITLE_INTERVAL);
  }

  /* ----------------------------------------------------------
     CLOSE OVERLAY
     ---------------------------------------------------------- */
  function closeOverlay() {
    clearInterval(overlayMantraTimer);
    if (overlay) {
      overlay.classList.add('fade-out');
      /* Remove from DOM after transition */
      setTimeout(function () {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        showPlayer();
      }, 850);
    } else {
      showPlayer();
    }
  }

  /* ----------------------------------------------------------
     SHOW FLOATING PLAYER
     ---------------------------------------------------------- */
  function showPlayer() {
    if (!player) return;
    player.style.display = 'flex';
    /* Trigger animation on next frame */
    requestAnimationFrame(function () {
      player.classList.add('visible');
    });
    startSubtitleRotation();
  }

  /* ----------------------------------------------------------
     AUDIO PLAYBACK — tries HTML5 audio first, falls back to YouTube
     ---------------------------------------------------------- */
  function tryPlayAudio() {
    if (!audio) return;

    /* Check if src is set and file might exist */
    var src = audio.getAttribute('src') || '';
    if (!src || src.indexOf('YOUTUBE') !== -1) {
      /* No audio file — use YouTube */
      tryYouTube();
      return;
    }

    /* Try loading the audio */
    audio.volume = 0.7;
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        isPlaying = true;
        updatePlayBtn();
        if (progressWrap) progressWrap.style.display = 'flex';
        startProgressUpdate();
      }).catch(function () {
        /* Autoplay blocked — show play button, don't auto-start */
        isPlaying = false;
        updatePlayBtn();
        /* Try YouTube as fallback */
        tryYouTube();
      });
    }
  }

  function tryYouTube() {
    if (!ytFrame) return;
    var src = ytFrame.getAttribute('data-src') || '';
    if (src && src.indexOf('YOUTUBE_VIDEO_ID') === -1) {
      ytFrame.src = src;
      useYouTube = true;
      isPlaying = true;
      updatePlayBtn();
    }
  }

  /* ----------------------------------------------------------
     PLAY / PAUSE
     ---------------------------------------------------------- */
  function togglePlay() {
    if (useYouTube) {
      /* For YouTube: post message to IFrame API */
      if (ytFrame && ytFrame.contentWindow) {
        if (isPlaying) {
          ytFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          isPlaying = false;
        } else {
          ytFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          isPlaying = true;
        }
      }
    } else {
      if (!audio) return;
      if (audio.paused) {
        audio.play().then(function () {
          isPlaying = true;
          if (progressWrap) progressWrap.style.display = 'flex';
          startProgressUpdate();
        }).catch(function () {});
      } else {
        audio.pause();
        isPlaying = false;
      }
    }
    updatePlayBtn();
  }

  /* ----------------------------------------------------------
     MUTE / UNMUTE
     ---------------------------------------------------------- */
  function toggleMute() {
    isMuted = !isMuted;
    if (audio) audio.muted = isMuted;
    if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
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
     PROGRESS BAR UPDATE (HTML5 audio only)
     ---------------------------------------------------------- */
  var progressTimer = null;

  function startProgressUpdate() {
    clearInterval(progressTimer);
    progressTimer = setInterval(function () {
      if (!audio || audio.paused) return;
      var duration = audio.duration;
      if (!duration || isNaN(duration)) return;
      var pct = (audio.currentTime / duration) * 100;
      if (progressBar) progressBar.style.width = pct + '%';
      if (timeEl) timeEl.textContent = formatTime(audio.currentTime);
    }, 1000);
  }

  function formatTime(secs) {
    var m = Math.floor(secs / 60);
    var s = Math.floor(secs % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* Click on progress bar to seek */
  var progressEl = document.getElementById('chanting-progress');
  if (progressEl) {
    progressEl.addEventListener('click', function (e) {
      if (!audio || !audio.duration) return;
      var rect = progressEl.getBoundingClientRect();
      var pct  = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });
  }

  /* ----------------------------------------------------------
     SUBTITLE ROTATION in the floating player
     ---------------------------------------------------------- */
  function startSubtitleRotation() {
    clearInterval(subtitleTimer);
    currentLine = 0;
    updateSubtitle();
    subtitleTimer = setInterval(function () {
      currentLine = (currentLine + 1) % MANTRA_LINES.length;
      updateSubtitle();
    }, SUBTITLE_INTERVAL);
  }

  function updateSubtitle() {
    if (!subtitleEl) return;
    subtitleEl.style.animation = 'none';
    /* Force reflow to restart animation */
    void subtitleEl.offsetWidth;
    subtitleEl.style.animation = '';
    subtitleEl.textContent = MANTRA_LINES[currentLine];
  }

  /* ----------------------------------------------------------
     CLOSE PLAYER
     ---------------------------------------------------------- */
  function closePlayer() {
    clearInterval(subtitleTimer);
    clearInterval(progressTimer);
    if (audio) { audio.pause(); audio.currentTime = 0; }
    if (ytFrame) ytFrame.src = '';
    if (player) {
      player.classList.remove('visible');
      setTimeout(function () {
        if (player) player.style.display = 'none';
      }, 500);
    }
  }

  /* ----------------------------------------------------------
     BIND EVENTS
     ---------------------------------------------------------- */
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      closeOverlay();
      /* Small delay to let overlay fade before starting audio */
      setTimeout(tryPlayAudio, 400);
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      closeOverlay();
      /* Don't start audio */
    });
  }

  if (playBtn)  playBtn.addEventListener('click',  togglePlay);
  if (muteBtn)  muteBtn.addEventListener('click',  toggleMute);
  if (closeBtn) closeBtn.addEventListener('click', closePlayer);

  /* ----------------------------------------------------------
     INIT — start overlay mantra animation on load
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    startOverlayMantra();
  });

})();
