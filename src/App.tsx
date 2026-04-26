import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { PatientForm } from '@/components/PatientForm';
import { VisualizationCard } from '@/components/VisualizationCard';
import { PredictionPanel } from '@/components/PredictionPanel';
import { mockPatient, mockPrediction, generateWaveformData } from '@/utils/mockData';

export default function App() {
  const [analysisKey, setAnalysisKey] = useState(0);

  // Stable waveform data — regenerated only when "New Analysis" is clicked
  const waveformData = useMemo(() => generateWaveformData(280), [analysisKey]);

  const handleNewAnalysis = () => {
    // In production: clear state, reset form, prompt for new upload
    setAnalysisKey(k => k + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar onNewAnalysis={handleNewAnalysis} />

      <main className="flex-1 p-5 flex flex-col gap-4 max-w-[1400px] mx-auto w-full">
        {/* Patient Information */}
        <PatientForm
          key={`form-${analysisKey}`}
          initial={mockPatient}
          onUpload={() => console.log('TODO: wire to backend upload endpoint')}
          onRecord={() => console.log('TODO: wire to backend record endpoint')}
        />

        {/* Visualization + Prediction */}
        <div className="grid grid-cols-[1fr_320px] gap-4">
          <VisualizationCard
            key={`viz-${analysisKey}`}
            waveformData={waveformData}
            durationSeconds={mockPatient.recordingDuration}
          />
          <PredictionPanel
            key={`pred-${analysisKey}`}
            prediction={mockPrediction}
          />
        </div>
      </main>
    </div>
  );
}
