import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  progress: number;       // 0–100
  currentTime: number;    // seconds
  duration: number;       // seconds
  toggle: () => void;
  seek: (pct: number) => void;
  reset: () => void;
}

export function useAudioPlayer(durationSeconds = 15): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stop();
    setIsPlaying(false);
    setProgress(0);
  }, [stop]);

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const seek = useCallback((pct: number) => {
    setProgress(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      // advance ~10 fps
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / durationSeconds / 10);
          if (next >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    } else {
      stop();
    }
    return stop;
  }, [isPlaying, durationSeconds, stop]);

  return {
    isPlaying,
    progress,
    currentTime: (progress / 100) * durationSeconds,
    duration: durationSeconds,
    toggle,
    seek,
    reset,
  };
}
