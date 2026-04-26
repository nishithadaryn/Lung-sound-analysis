# 🫁 Lung Sound Analysis System

A production-grade React + TypeScript frontend for respiratory disease detection via audio analysis.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Charts | Canvas API (waveform + spectrogram) |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx            # Top navigation bar
│   ├── PatientForm.tsx       # Patient info + upload/record controls
│   ├── VisualizationCard.tsx # Waveform + spectrogram + audio player
│   ├── WaveformChart.tsx     # Canvas-based waveform renderer
│   ├── Spectrogram.tsx       # Canvas-based spectrogram renderer
│   ├── AudioPlayer.tsx       # Playback controls with progress bar
│   └── PredictionPanel.tsx   # Disease prediction + probability bars
├── hooks/
│   └── useAudioPlayer.ts     # Audio playback state hook
├── types/
│   └── api.ts                # All TypeScript interfaces (PatientInfo, PredictionResult, etc.)
├── utils/
│   └── mockData.ts           # Mock data — replace with real API calls
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Connecting Your Backend

1. **Replace mock data** in `src/utils/mockData.ts` with real API calls
2. **Type-safe API response** — your backend should return an `AnalysisResponse` (see `src/types/api.ts`)
3. **Wire up Upload/Record** buttons in `PatientForm.tsx` → call your ML model endpoint
4. **Pass real waveform data** from `AnalysisResponse.waveform` into `<VisualizationCard />`
5. **Pass real prediction** from `AnalysisResponse.prediction` into `<PredictionPanel />`

### Expected API Response Shape

```typescript
interface AnalysisResponse {
  patient: PatientInfo;
  waveform: { time: number; amplitude: number }[];   // 0–14s, amplitude -1 to 1
  prediction: {
    predictedDisease: 'Normal' | 'Asthma' | 'Pneumonia' | 'COPD' | 'Bronchial';
    confidenceScore: number;   // 0–100
    severityLevel: 'Mild' | 'Moderate' | 'Severe';
    clinicalNote: string;
    probabilities: { label: string; probability: number; color: string }[];
  };
}
```

## Build for Production

```bash
npm run build
```

Output is in `dist/` — deploy to Vercel, Netlify, or any static host.
