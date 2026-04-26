import { BarChart2 } from 'lucide-react';
import { WaveformChart } from './WaveformChart';
import { Spectrogram } from './Spectrogram';
import { AudioPlayer } from './AudioPlayer';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import type { WaveformPoint } from '@/types/api';

interface VisualizationCardProps {
  waveformData: WaveformPoint[];
  durationSeconds: number;
}

export function VisualizationCard({ waveformData, durationSeconds }: VisualizationCardProps) {
  const player = useAudioPlayer(durationSeconds);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-slate-100 px-5 py-4 flex flex-col gap-4 animate-fade-up"
      style={{ animationDelay: '0.08s' }}
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <BarChart2 size={15} className="text-brand-500" />
        <span className="font-semibold text-slate-700 text-sm">Lung Sound Visualization</span>
      </div>

      {/* Waveform */}
      <WaveformChart data={waveformData} playheadPct={player.progress} />

      {/* Spectrogram */}
      <Spectrogram playheadPct={player.progress} />

      {/* Audio player */}
      <AudioPlayer player={player} />
    </div>
  );
}
