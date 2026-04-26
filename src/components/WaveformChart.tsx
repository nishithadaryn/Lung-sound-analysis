import { useEffect, useRef } from 'react';
import type { WaveformPoint } from '@/types/api';

interface WaveformChartProps {
  data: WaveformPoint[];
  playheadPct?: number; // 0–100
}

export function WaveformChart({ data, playheadPct = 0 }: WaveformChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;

      const ctx = canvas.getContext('2d')!;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, W, H);

      const padTop    = 14;
      const padBottom = 18;
      const plotH     = H - padTop - padBottom;
      const mid       = padTop + plotH / 2;

      // ── Grid lines ────────────────────────────────────────────────
      const yLevels = [1.0, 0.5, 0.0, -0.5, -1.0];
      ctx.font      = `${9 * (W / 600)}px JetBrains Mono, monospace`;
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'right';

      yLevels.forEach(v => {
        const y = mid - v * (plotH / 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(v.toFixed(1), 30, y + 3.5);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(36, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      });

      // ── X-axis ticks ──────────────────────────────────────────────
      const xTicks = [0, 2, 4, 6, 8, 10, 12, 14];
      ctx.textAlign  = 'center';
      ctx.fillStyle  = '#94a3b8';
      const plotW    = W - 36;
      xTicks.forEach(t => {
        const x = 36 + (t / 14) * plotW;
        ctx.fillText(String(t), x, H - 2);
      });

      // ── Waveform path ─────────────────────────────────────────────
      ctx.strokeStyle = '#3b9eff';
      ctx.lineWidth   = 1.5;
      ctx.lineJoin    = 'round';
      ctx.beginPath();

      data.forEach((pt, i) => {
        const x = 36 + (i / (data.length - 1)) * plotW;
        const y = mid - pt.amplitude * (plotH / 2);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // ── Playhead ──────────────────────────────────────────────────
      if (playheadPct > 0) {
        const px = 36 + (playheadPct / 100) * plotW;
        ctx.strokeStyle = 'rgba(251,191,36,0.85)';
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, padTop);
        ctx.lineTo(px, padTop + plotH);
        ctx.stroke();
      }
    };

    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [data, playheadPct]);

  return (
    <div className="relative">
      <p className="text-[10px] text-brand-500 font-semibold mb-1.5">
        Waveform (Time vs Amplitude)
      </p>
      <div className="relative pl-8">
        <canvas ref={canvasRef} style={{ width: '100%', height: 110, display: 'block' }} />
        <p className="text-center text-[10px] text-slate-400 mt-1">Time (seconds)</p>
        <p className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 whitespace-nowrap origin-center">
          Amplitude
        </p>
      </div>
    </div>
  );
}
