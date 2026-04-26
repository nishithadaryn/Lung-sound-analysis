import { useEffect, useRef } from 'react';

interface SpectrogramProps {
  playheadPct?: number;
}

// Thermal color palette (black → purple → red → orange → yellow → white)
const PALETTE: string[] = [
  '#0a0015','#1a0030','#2d004d','#4b006a','#6a007a',
  '#8800a0','#aa00b0','#c800c0','#e000d0','#f000c0',
  '#f50090','#f50060','#f02000','#f05000','#f07000',
  '#f09000','#f0b000','#f0d000','#f8f000','#ffffff',
];

function getColor(energy: number): string {
  const idx = Math.min(PALETTE.length - 1, Math.floor(energy * (PALETTE.length - 1)));
  return PALETTE[idx];
}

/** Seeded pseudo-random so the spectrogram is deterministic */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function Spectrogram({ playheadPct = 0 }: SpectrogramProps) {
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

      const padBottom = 18;
      const plotH     = H - padBottom;
      const plotW     = W - 36;

      const COLS = 140;
      const ROWS = 20;
      const cellW = plotW / COLS;
      const cellH = plotH / ROWS;

      const rand = seededRand(7331);

      // Precompute burst positions
      const bursts = [0.28, 0.55, 0.72, 0.88];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const t = c / COLS;
          let e = rand() * 0.25;

          if (r < 5)            e += 0.55 + Math.sin(t * 8)       * 0.3;
          else if (r < 10)      e += 0.30 + Math.sin(t * 12 + 1)  * 0.2;
          else if (r < 15)      e += 0.15 + Math.sin(t * 6)        * 0.12;

          bursts.forEach(bt => {
            const dist = Math.abs(t - bt);
            if (dist < 0.045 && r < 13) e += 0.75 * (1 - dist / 0.045);
          });

          e = Math.max(0, Math.min(1, e));

          ctx.fillStyle = getColor(e);
          ctx.fillRect(
            36 + c * cellW,
            (ROWS - 1 - r) * cellH,
            cellW + 0.5,
            cellH + 0.5,
          );
        }
      }

      // ── Y axis labels ────────────────────────────────────────────
      ctx.font      = '9px JetBrains Mono, monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'right';
      ['8','6','4','2','0'].forEach((v, i) => {
        const y = (i / 4) * plotH + 4;
        ctx.fillText(v, 32, y);
      });

      // ── X axis ticks ─────────────────────────────────────────────
      ctx.textAlign = 'center';
      [0,2,4,6,8,10,12,14].forEach(t => {
        const x = 36 + (t / 14) * plotW;
        ctx.fillText(String(t), x, H - 2);
      });

      // ── Playhead ─────────────────────────────────────────────────
      if (playheadPct > 0) {
        const px = 36 + (playheadPct / 100) * plotW;
        ctx.strokeStyle = 'rgba(251,191,36,0.9)';
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, plotH);
        ctx.stroke();
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [playheadPct]);

  return (
    <div className="relative">
      <p className="text-[10px] text-brand-500 font-semibold mb-1.5">
        Spectrogram (Frequency vs Time)
      </p>
      <div className="relative pl-8">
        <canvas ref={canvasRef} style={{ width: '100%', height: 120, display: 'block' }} />
        <p className="text-center text-[10px] text-slate-400 mt-1">Time (seconds)</p>
        <p className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 whitespace-nowrap origin-center">
          Frequency (kHz)
        </p>
      </div>
    </div>
  );
}
