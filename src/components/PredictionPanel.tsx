import type { PredictionResult } from '@/types/api';
import { severityConfig } from '@/utils/mockData';

interface PredictionPanelProps {
  prediction: PredictionResult;
}

// SVG donut constants
const RADIUS    = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 238.76

export function PredictionPanel({ prediction }: PredictionPanelProps) {
  const { predictedDisease, confidenceScore, severityLevel, clinicalNote, probabilities } = prediction;

  const strokeDashoffset = CIRCUMFERENCE * (1 - confidenceScore / 100);
  const sev = severityConfig[severityLevel];

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 animate-fade-up"
      style={{ animationDelay: '0.15s' }}
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="font-semibold text-slate-700 text-sm">Prediction Output</span>
      </div>

      {/* Predicted Disease */}
      <div>
        <p className="text-[11px] text-slate-400 mb-1.5">Predicted Disease</p>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🫁</span>
          <span className="text-2xl font-bold text-red-500">{predictedDisease}</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-3">

        {/* Confidence Donut */}
        <div>
          <p className="text-[11px] text-slate-400 mb-2">Confidence Score</p>
          <div className="relative w-24 h-24">
            <svg width="96" height="96" viewBox="0 0 100 100" className="-rotate-90">
              {/* Track */}
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="12" />
              {/* Fill */}
              <circle
                cx="50" cy="50" r={RADIUS}
                fill="none"
                stroke="#3b9eff"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                className="animate-donut"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-800">{confidenceScore}%</span>
            </div>
          </div>
        </div>

        {/* Severity */}
        <div>
          <p className="text-[11px] text-slate-400 mb-2">Severity Level</p>
          <div className={`${sev.bg} border ${sev.border} rounded-lg px-3 py-2.5`}>
            <div className={`text-base font-bold ${sev.text} flex items-center gap-1.5`}>
              <span>📊</span>
              {severityLevel}
            </div>
            <p className={`text-[10px] mt-1 ${sev.note}`}>{clinicalNote}</p>
          </div>
        </div>
      </div>

      {/* Probability Breakdown */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-2.5">Probability Breakdown</p>
        <div className="flex flex-col gap-2">
          {probabilities.map(({ label, probability, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 w-16 flex-shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full animate-bar"
                  style={{ width: `${probability}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-[11px] text-slate-500 w-7 text-right flex-shrink-0">
                {probability}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
