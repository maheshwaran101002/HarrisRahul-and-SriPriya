"use client";

// Global audio instance singleton for synchronous user-gesture playback on iOS/Mobile browsers
let globalAudio: HTMLAudioElement | null = null;
let isAudioPlaying = false;
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
  }
  return globalAudio;
}

export function playAudioDirectly(): Promise<void> {
  const audio = getAudioInstance();
  if (!audio) return Promise.resolve();

  // Attempt synchronous playback
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
