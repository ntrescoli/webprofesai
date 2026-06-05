import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const DashboardLayout = ({ children, currentView, onNavigate }: DashboardLayoutProps) => {
  
  // Función rápida para cambiar el atributo del tema HTML
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-distro-bg text-distro-text">
      
      {/* Sidebar */}
      <aside className="w-64 bg-distro-header border-r border-distro-border flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          <div className="p-6 border-b border-distro-border">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="bg-distro-accent text-white px-2 py-0.5 rounded font-mono font-bold text-xs shadow">🐧</div>
              <span className="font-bold text-lg text-white font-sans tracking-tight">System Admin</span>
            </div>
          </div>

          {/* Menú de navegación */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => onNavigate('terminal')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                currentView === 'terminal' ? 'bg-distro-border text-white' : 'text-slate-300 hover:bg-distro-border/50 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-terminal text-distro-accent"></i>
              <span>Terminal</span>
            </button>

            <button 
              onClick={() => onNavigate('alumnos')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                currentView === 'alumnos' ? 'bg-distro-border text-white' : 'text-slate-300 hover:bg-distro-border/50 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-graduation-cap text-distro-accent"></i>
              <span>Alumnos</span>
            </button>

            <button 
              onClick={() => onNavigate('examenes')} 
              className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                currentView === 'examenes' ? 'bg-distro-border text-white' : 'text-slate-300 hover:bg-distro-border/50 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-file-code text-distro-accent"></i>
              <span>Exámenes</span>
            </button>

            {/* BOTÓN VISTA CREAR EXAMEN */}
            <div className="pt-4 mt-4 border-t border-distro-border/50">
              <button 
                onClick={() => onNavigate('crear-examen')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-bold rounded-lg transition border border-distro-accent/30 ${
                  currentView === 'crear-examen' 
                    ? 'bg-distro-accent text-white border-transparent' 
                    : 'text-distro-accent hover:bg-distro-accent hover:text-white'
                }`}
              >
                <i className="fa-solid fa-circle-plus"></i>
                <span>Crear Examen</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Selector de Sabores y Perfil */}
        <div className="p-4 border-t border-distro-border space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Sabor de Linux</label>
            <select 
              onChange={handleThemeChange}
              className="w-full bg-distro-bg border border-distro-border rounded p-1.5 text-xs text-white focus:border-distro-accent outline-none cursor-pointer font-sans"
            >
              <option value="ubuntu">Ubuntu 24.04 LTS</option>
              <option value="debian">Debian GNU/Linux</option>
              <option value="linuxmint">Linux Mint</option>
              <option value="arch">Arch Linux</option>
              <option value="cmd">Windows CMD</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 pt-2 border-t border-distro-border/30">
            <div className="w-9 h-9 rounded-full bg-distro-border flex items-center justify-center text-distro-accent font-bold text-sm border border-distro-accent/20">
              PR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Profesor Nico</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">root@terminal-os</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenedor central */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-distro-bg">
        {children}
      </main>

    </div>
  );
};