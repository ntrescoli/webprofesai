import { ReactTerminal } from "terminal-simulator";

interface TerminalWidgetProps {
  user: string;
  ReactTerminal: any; // Asegúrate de importar ReactTerminal correctamente en el archivo donde uses TerminalWidget
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

      <ReactTerminal />

    </div>
  );
};