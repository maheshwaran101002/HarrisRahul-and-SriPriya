"use client";

// Global audio instance singleton for synchronous user-gesture playback on iOS/Mobile browsers
let globalAudio: HTMLAudioElement | null = null;
let isAudioPlaying = false;
let wasPlayingBeforeHide = false;
let isVisibilityListenerAttached = false;

const AUDIO_POSITION_KEY = "wedding_audio_position";
const listeners = new Set<(playing: boolean) => void>();

export function getAudioInstance(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio("/assets/wedding_audio.m4a");
    globalAudio.loop = true;
    globalAudio.volume = 0.4;
    globalAudio.setAttribute("playsinline", "true");
    globalAudio.setAttribute("webkit-playsinline", "true");
    globalAudio.preload = "auto";

    // Restore saved playback position across page refreshes
    try {
      const savedPos = sessionStorage.getItem(AUDIO_POSITION_KEY);
      if (savedPos) {
        const time = parseFloat(savedPos);
        if (!isNaN(time) && time > 0) {
          globalAudio.currentTime = time;
        }
      }
    } catch {
      // Ignore storage errors
    }

    // Continuously persist current playback position
    globalAudio.addEventListener("timeupdate", () => {
      if (globalAudio && !globalAudio.paused && globalAudio.currentTime > 0) {
        try {
          sessionStorage.setItem(AUDIO_POSITION_KEY, String(globalAudio.currentTime));
        } catch {
          // Ignore storage errors
        }
      }
    });

    attachVisibilityListeners();
  }
  return globalAudio;
}

function attachVisibilityListeners() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (isVisibilityListenerAttached) return;
  isVisibilityListenerAttached = true;

  const attemptResume = () => {
    if (wasPlayingBeforeHide) {
      wasPlayingBeforeHide = false;
      playAudioDirectly();
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isAudioPlaying) {
        wasPlayingBeforeHide = true;
        pauseAudioDirectly();
      }
    } else {
      attemptResume();
    }
  };

  // Listen for visibility and window focus (returning from Google Maps or locking screen)
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", () => {
    if (isAudioPlaying) {
      wasPlayingBeforeHide = true;
      pauseAudioDirectly();
    }
  });

  window.addEventListener("focus", attemptResume);

  // iOS Safari / Chrome Android gesture fallback when coming back to the page
  const handleUserReturnTouch = () => {
    if (wasPlayingBeforeHide) {
      attemptResume();
    }
  };

  window.addEventListener("touchstart", handleUserReturnTouch, { passive: true });
  window.addEventListener("click", handleUserReturnTouch, { passive: true });
  window.addEventListener("scroll", handleUserReturnTouch, { passive: true });
}

export function playAudioDirectly(): Promise<void> {
  const audio = getAudioInstance();
  if (!audio) return Promise.resolve();

  // Restore saved playback position if audio was reset to 0
  if (audio.currentTime === 0) {
    try {
      const savedPos = sessionStorage.getItem(AUDIO_POSITION_KEY);
      if (savedPos) {
        const time = parseFloat(savedPos);
        if (!isNaN(time) && time > 0) {
          audio.currentTime = time;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    return playPromise
      .then(() => {
        isAudioPlaying = true;
        notifyListeners();
      })
      .catch((err) => {
        console.warn("Autoplay / Audio play blocked:", err);
        isAudioPlaying = false;
        notifyListeners();
      });
  } else {
    isAudioPlaying = true;
    notifyListeners();
    return Promise.resolve();
  }
}

export function pauseAudioDirectly() {
  if (globalAudio) {
    globalAudio.pause();
    isAudioPlaying = false;
    notifyListeners();
  }
}

export function toggleAudioDirectly(): boolean {
  if (isAudioPlaying) {
    wasPlayingBeforeHide = false;
    pauseAudioDirectly();
  } else {
    playAudioDirectly();
  }
  return isAudioPlaying;
}

export function getIsAudioPlaying(): boolean {
  return isAudioPlaying;
}

export function subscribeAudioState(fn: (playing: boolean) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn(isAudioPlaying));
}
