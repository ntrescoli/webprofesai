import React from 'react';

interface AssignmentLoginViewProps {
  onNavigate: (view: string) => void;
}

export const AssignmentLoginView = ({ onNavigate }: AssignmentLoginViewProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que recargue la página al hacer submit
    onNavigate('assignment');
  };

  return (
    <div className="p-8 flex-1 flex flex-col space-y-6 bg-distro-bg text-distro-text">
      {/* Cabecera de la Vista */}
      <div className="border-b border-distro-border/50 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
          Título del examen
        </h2>
        <p className="text-sm text-slate-400 mt-1 font-sans">
          Por favor, introduce tus datos para inicializar el entorno de evaluación.
        </p>
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 flex items-start justify-start max-w-xl">
        <section className="w-full bg-distro-header border border-distro-border rounded-xl shadow-lg overflow-hidden">
          
          {/* Header del Panel (Estilo Ventana de Terminal) */}
          <div className="bg-distro-border/30 px-5 py-3 border-b border-distro-border flex items-center justify-between">
            <h1 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <span className="text-distro-accent">❯</span>
              <span>Assignment Launcher</span>
            </h1>
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/40 block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/40 block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/40 block"></span>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              
              {/* Input NIA */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  NIA:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. 100456789"
                  className="w-full bg-distro-bg border border-distro-border rounded p-2.5 text-sm text-white focus:border-distro-accent outline-none transition font-mono"
                />
              </div>

              {/* Input Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  Nombre:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-distro-bg border border-distro-border rounded p-2.5 text-sm text-white focus:border-distro-accent outline-none transition font-sans"
                />
              </div>

              {/* Input Apellido */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  Apellido:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Tus apellidos"
                  className="w-full bg-distro-bg border border-distro-border rounded p-2.5 text-sm text-white focus:border-distro-accent outline-none transition font-sans"
                />
              </div>

            </div>

            {/* Botón de Submit */}
            <div className="pt-4 border-t border-distro-border/30 mt-6">
              <button 
                id="launch-vm" 
                type="submit" 
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-distro-accent text-white hover:bg-distro-accent/90 transition shadow-md active:scale-[0.98]"
              >
                <i className="fa-solid fa-rocket text-xs"></i>
                <span>Empezar Examen</span>
              </button>
            </div>
          </form>
          
          {/* Status Panel (Opcional, por si inyectas logs de carga de la VM) */}
          <div id="launch-status" className="status px-6 pb-4 text-xs font-mono text-slate-500 empty:hidden"></div>
        </section>
      </div>
    </div>
  );
};