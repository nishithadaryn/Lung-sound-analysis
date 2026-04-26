import type { PatientInfo, PredictionResult, WaveformPoint } from '@/types/api';

// ─── Mock Patient ─────────────────────────────────────────────────────────────

export const mockPatient: PatientInfo = {
  patientId: '',
  name: '',
  age: '',
  gender: '',
  dateOfRecording: 'Apr 24, 2024, 10:30 AM',
  recordingStatus: 'Completed',
  recordingDuration: 15,
};

// ─── Mock Prediction ──────────────────────────────────────────────────────────

export const mockPrediction: PredictionResult = {
  predictedDisease: 'Pneumonia',
  confidenceScore: 82,
  severityLevel: 'Moderate',
  clinicalNote: 'Clinical attention recommended',
  probabilities: [
    { label: 'Normal',    probability: 5,  color: '#22c55e' },
    { label: 'Asthma',   probability: 10, color: '#f59e0b' },
    { label: 'Pneumonia',probability: 82, color: '#ef4444' },
    { label: 'COPD',     probability: 5,  color: '#8b5cf6' },
    { label: 'Bronchial',probability: 8,  color: '#22c55e' },
  ],
};

// ─── Generate Waveform Data ───────────────────────────────────────────────────

export function generateWaveformData(points = 280): WaveformPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const t = i / points;
    const amp =
      Math.sin(t * 47) * 0.40 +
      Math.sin(t * 23 + 1.2) * 0.25 +
      Math.sin(t * 11 + 2.4) * 0.20 +
      Math.sin(t * 5.5 + 0.8) * 0.15 +
      (Math.random() - 0.5) * 0.20;
    return {
      time: parseFloat((t * 14).toFixed(3)),
      amplitude: parseFloat(Math.max(-1, Math.min(1, amp)).toFixed(4)),
    };
  });
}

// ─── Severity config ──────────────────────────────────────────────────────────

export const severityConfig: Record<string, { bg: string; border: string; text: string; note: string }> = {
  Mild:     { bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700',  note: 'text-green-600' },
  Moderate: { bg: 'bg-amber-50',  border: 'border-amber-200', text: 'text-amber-700',  note: 'text-amber-600' },
  Severe:   { bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-700',    note: 'text-red-600'   },
};
