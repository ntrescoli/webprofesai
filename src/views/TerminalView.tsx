
// 1. Importas el componente desde tu librería privada
import { ReactTerminal } from 'terminal-simulator'; 

// 2. ¡MUY IMPORTANTE! Importas los estilos para que la terminal no se vea rota
import 'terminal-simulator/style.css';

export const TerminalView = () => {
  return (
    <div className="p-8 flex-1 flex flex-col space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Consola del Sistema</h2>
        <p className="text-sm text-slate-400">Entorno tty1 de pruebas en caliente.</p>
      </div>
      <div className="flex-1 flex flex-col min-h-[400px]">
        {/* <TerminalWidget user="nico" /> */}
        <ReactTerminal />
      </div>
    </div>
  );
};