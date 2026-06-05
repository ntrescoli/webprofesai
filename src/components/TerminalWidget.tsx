import React from 'react';

interface TerminalWidgetProps {
  user: string;
}

export const TerminalWidget = ({ user }: TerminalWidgetProps) => {
  return (
    <div className="w-full max-w-4xl rounded-xl border border-distro-border shadow-2xl overflow-hidden bg-distro-bg flex flex-col aspect-video">
      
      {/* Barra de título estilo Ventana de Sistema */}
      <div className="bg-distro-header px-4 py-3 border-b border-distro-border flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-zinc-700/80"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700/80"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700/80"></div>
        </div>
        <span className="text-xs font-mono text-distro-text/50 font-medium">
          {user}@js-terminal: ~
        </span>
        <div className="w-12"></div>
      </div>

      {/* Pantalla de comandos */}
      <div className="flex-1 p-5 font-mono text-sm overflow-y-auto space-y-2 text-distro-text" id="output">
        <p className="text-slate-400">Welcome to JS-Terminal Virtual OS Environment</p>
        <p className="text-slate-400">System initialization completed successfully.</p>
        <p className="text-distro-accent/80">// Tip: Escribe 'help' para listar los comandos simulados disponibles.</p>
        
        {/* Línea del Prompt Activo */}
        <div className="flex items-center space-x-2 pt-2">
          <span id="prompt" className="text-emerald-400 font-bold shrink-0">
            {user}@virtual-os:<span className="text-sky-400">~</span>$
          </span>
          <input 
            type="text" 
            id="terminal-input" 
            className="flex-1 bg-transparent border-none outline-none text-slate-100 focus:ring-0 p-0 font-mono" 
            autoFocus 
            autoComplete="off" 
            spellCheck="false" 
          />
        </div>
      </div>

    </div>
  );
};