// ─── Patient ──────────────────────────────────────────────────────────────────

export interface PatientInfo {
  patientId: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  dateOfRecording: string;
  recordingStatus: 'Completed' | 'In Progress' | 'Pending';
  recordingDuration: number; // seconds
}

// ─── Audio Analysis ───────────────────────────────────────────────────────────

export interface WaveformPoint {
  time: number;        // seconds
  amplitude: number;   // -1 to 1
}

export interface SpectrogramCell {
  frequency: number;  // kHz
  time: number;       // seconds
  energy: number;     // 0 to 1
}

// ─── Prediction ───────────────────────────────────────────────────────────────

export type DiseaseLabel = 'Normal' | 'Asthma' | 'Pneumonia' | 'COPD' | 'Bronchial';

export type SeverityLevel = 'Mild' | 'Moderate' | 'Severe';

export interface DiseaseProbability {
  label: DiseaseLabel;
  probability: number; // 0–100
  color: string;       // tailwind/hex
}

export interface PredictionResult {
  predictedDisease: DiseaseLabel;
  confidenceScore: number;         // 0–100
  severityLevel: SeverityLevel;
  clinicalNote: string;
  probabilities: DiseaseProbability[];
}

// ─── API Response (from your backend) ────────────────────────────────────────

export interface AnalysisResponse {
  patient: PatientInfo;
  waveform: WaveformPoint[];
  prediction: PredictionResult;
}

// ─── Upload State ─────────────────────────────────────────────────────────────

export type UploadStatus = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';
