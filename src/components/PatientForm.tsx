import { useState } from 'react';
import { User, Upload, Mic, CheckCircle2, Calendar } from 'lucide-react';
import type { PatientInfo } from '@/types/api';

interface PatientFormProps {
  initial: PatientInfo;
  onUpload: () => void;
  onRecord: () => void;
}

export function PatientForm({ initial, onUpload, onRecord }: PatientFormProps) {
  const [form, setForm] = useState<PatientInfo>(initial);

  const set = (key: keyof PatientInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-5 py-4 animate-fade-up">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <User size={15} className="text-brand-500" />
        <span className="font-semibold text-slate-700 text-sm">
          Patient Information &amp; Recording
        </span>
      </div>

      {/* Fields row */}
      <div className="flex flex-wrap items-end gap-4">

        {/* Patient ID / Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Patient ID / Name</label>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Enter Patient ID or Name"
            className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-700 w-48 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Age</label>
          <input
            type="number"
            value={form.age}
            onChange={set('age')}
            placeholder="Age"
            className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-700 w-16 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Gender</label>
          <select
            value={form.gender}
            onChange={set('gender')}
            className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-700 w-24 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition bg-white"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Date of Recording</label>
          <div className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-600 flex items-center gap-2 w-48">
            <Calendar size={12} className="text-slate-400" />
            {form.dateOfRecording}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Recording Status</label>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow" />
            <span className="text-xs font-semibold text-emerald-700">{form.recordingStatus}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 font-medium">Recording Duration</label>
          <span className="text-xs text-slate-700 py-1.5">{form.recordingDuration} seconds</span>
        </div>

        {/* Buttons — pushed to right */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onUpload}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Upload size={13} />
            Upload Audio
          </button>
          <button
            onClick={onRecord}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <CheckCircle2 size={13} />
            Record
          </button>
        </div>
      </div>
    </div>
  );
}
