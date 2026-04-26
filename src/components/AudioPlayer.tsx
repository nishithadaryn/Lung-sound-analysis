import { Play, Pause, Square, Volume2, Download } from 'lucide-react';
import type { UseAudioPlayerReturn } from '@/hooks/useAudioPlayer';

// Re-export the type alias so it can be imported elsewhere
export type { UseAudioPlayerReturn };

interface AudioPlayerProps {
  player: ReturnType<typeof import('@/hooks/useAudioPlayer').useAudioPlayer>;
}

function formatTime(s: number): string {
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export function AudioPlayer({ player }: AudioPlayerProps) {
  const { isPlaying, progress, currentTime, duration, toggle, seek, reset } = player;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = ((e.clientX - rect.left) / rect.width) * 100;
    seek(pct);
  };

  return (
    <div className="pt-2 border-t border-slate-100">
      <p className="text-xs font-semibold text-slate-700 mb-2">Audio Playback</p>
      <div className="flex items-center gap-3">

        {/* Play / Pause */}
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center text-white transition-colors flex-shrink-0"
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>

        {/* Stop */}
        <button
          onClick={reset}
          className="w-5 h-5 rounded bg-slate-300 hover:bg-slate-400 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <Square size={10} className="text-slate-600" />
        </button>

        {/* Time */}
        <span className="text-[11px] font-mono text-slate-500 flex-shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Progress track */}
        <div
          className="flex-1 h-1.5 bg-slate-200 rounded-full relative cursor-pointer group"
          onClick={handleTrackClick}
        >
          <div
            className="h-full bg-brand-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Volume icon */}
        <Volume2 size={16} className="text-slate-400 flex-shrink-0" />

        {/* Download */}
        <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-md transition-colors flex-shrink-0">
          <Download size={12} />
          Download
        </button>
      </div>
    </div>
  );
}
