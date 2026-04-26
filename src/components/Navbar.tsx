import { Plus } from 'lucide-react';

interface NavbarProps {
  onNewAnalysis: () => void;
}

export function Navbar({ onNewAnalysis }: NavbarProps) {
  return (
    <nav className="bg-navy-900 h-16 flex items-center justify-between px-6 shadow-lg">
      {/* Brand */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center text-xl select-none">
          🫁
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-wide leading-tight">
            LUNG SO<span className="text-brand-400">UN</span>D ANALYSIS SYSTEM
          </h1>
          <p className="text-[10px] text-slate-400 tracking-widest uppercase mt-0.5">
            Respiratory Disease Detection
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onNewAnalysis}
        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
      >
        <Plus size={15} />
        New Analysis
      </button>
    </nav>
  );
}
