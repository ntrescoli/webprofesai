import { useState } from 'react';

interface CriterioPregunta {
  enunciado: string;
  path: string;
  condicion: string;
}

export const CrearExamenView = ({ onCancel }: { onCancel: () => void }) => {
  const [preguntas, setPreguntas] = useState<CriterioPregunta[]>([
    { enunciado: '', path: '', condicion: 'exists' }
  ]);

  const addPregunta = () => {
    setPreguntas([...preguntas, { enunciado: '', path: '', condicion: 'exists' }]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b border-distro-border pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Diseñador de Evaluaciones</h2>
          <p className="text-sm text-slate-400 mt-1">Define el entorno inicial de la tty y los criterios de validación automatizada.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition"
          >
            Cancelar
          </button>
          <button className="px-5 py-2 text-sm font-bold bg-distro-accent text-white rounded-lg hover:bg-distro-accentHover shadow-md transition">
            Publicar Reto
          </button>
        </div>
      </div>

      {/* Bloque 1: Entorno inicial */}
      <div className="bg-distro-header/40 border border-distro-border rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-distro-accent">1. Estado Inicial del Entorno</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300">Seleccionar Snapshot de Arranque (JSON)</label>
            <select className="w-full bg-distro-header border border-distro-border rounded-lg p-2.5 text-sm text-white focus:border-distro-accent outline-none transition cursor-pointer">
              <option>default-minimal.json</option>
              <option>server-lamp-mock.json</option>
            </select>
          </div>
          <div className="flex items-center p-4 bg-distro-header/60 rounded-lg border border-distro-border/50">
            <p className="text-xs text-slate-400 italic">
              <i className="fa-solid fa-info-circle mr-2 text-distro-accent"></i>
              La terminal del alumno se instanciará cargando este árbol de objetos directamente en la memoria.
            </p>
          </div>
        </div>
      </div>

      {/* Bloque 2: Preguntas y paths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-distro-accent">2. Preguntas y Criterios de Aceptación</h3>
          <button 
            onClick={addPregunta}
            className="px-3 py-1 text-xs font-bold bg-distro-border text-distro-text rounded-md border border-distro-border hover:border-distro-accent transition flex items-center space-x-1"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            <span>Añadir Pregunta</span>
          </button>
        </div>

        {preguntas.map((_, index) => (
          <div key={index} className="bg-distro-header/30 border border-distro-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Item #{(index + 1).toString().padStart(2, '0')}</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">Enunciado para el alumno</label>
              <input 
                type="text" 
                placeholder="Ej: Crea un usuario llamado nico en la máquina" 
                className="w-full bg-distro-header border border-distro-border rounded-lg p-2.5 text-sm text-white focus:border-distro-accent outline-none transition"
              />
            </div>

            <div className="bg-distro-bg/70 p-4 rounded-lg border border-distro-border/40 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-distro-accent font-semibold">Path del Criterio en el Objeto Estado</label>
                <input 
                  type="text" 
                  placeholder="Ej: users.nico" 
                  className="w-full bg-distro-header border border-distro-border rounded p-2 font-mono text-xs text-emerald-400 focus:border-distro-accent outline-none transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 font-semibold">Validación Requerida</label>
                <select className="w-full bg-distro-header border border-distro-border rounded p-2 text-xs text-white focus:border-distro-accent outline-none transition cursor-pointer">
                  <option value="exists">Debe existir la propiedad en el JSON</option>
                  <option value="not_exists">No debe existir (Entrada eliminada)</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};