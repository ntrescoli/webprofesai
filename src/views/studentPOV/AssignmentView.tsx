import { useState } from 'react';
import { Hypervisor } from './HyperVisor/Hypervisor';

interface AssignmentSubmittedViewProps {
  onNavigate: (view: string) => void;
}

export const AssignmentView = ({ onNavigate }: AssignmentSubmittedViewProps) => {

  const [activeQuestion, setActiveQuestion] = useState('p1');

  return (
    <div className="h-screen flex overflow-hidden bg-distro-bg text-distro-text relative">
      
      <Hypervisor />

      {/* Sidebar Derecha: Preguntas */}
      <aside className="w-64 bg-distro-header border-l border-distro-border flex flex-col justify-between shrink-0">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="p-6 border-b border-distro-border">
              <span className="font-bold text-base text-white font-sans tracking-tight block">Preguntas del examen</span>
            </div>
            <nav className="p-4 space-y-1">
              {['p1', 'p2', 'p3', 'p4'].map((pref, i) => (
                <button
                  key={pref}
                  onClick={() => setActiveQuestion(pref)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                    activeQuestion === pref ? 'bg-distro-accent text-white font-bold' : 'text-slate-300 hover:bg-distro-border/50 hover:text-white'
                  }`}
                >
                  <span>Pregunta {i + 1}</span>
                  {activeQuestion === pref && <i className="fa-solid fa-chevron-right text-xs opacity-80"></i>}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-distro-border space-y-2.5 bg-distro-header">
            <button type="button" className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-xs font-semibold rounded border border-distro-border text-slate-300 hover:bg-distro-border hover:text-white transition">
              <i className="fa-solid fa-floppy-disk text-slate-400"></i>
              <span>Guardar estado local</span>
            </button>
            <button type="button" className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition shadow"
            onClick={() => onNavigate('assignment-submitted')}>
              <i className="fa-solid fa-paper-plane"></i>
              <span>Entregar Examen</span>
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
};