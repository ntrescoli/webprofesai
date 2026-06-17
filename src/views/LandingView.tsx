import { TerminalWidget } from '../components/TerminalWidget';
import 'terminal-simulator/style.css';

interface LandingViewProps {
  onLogin: () => void;
}

export const LandingView = ({ onLogin }: LandingViewProps) => {

  return (
    <div className="flex flex-col min-h-screen bg-distro-bg text-distro-text">

      {/* Navbar Superior */}
      <nav className="border-b border-distro-border bg-distro-header/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="bg-distro-accent text-white px-2.5 py-1.5 rounded-lg font-mono font-bold tracking-tighter text-sm shadow-md">
            core_&gt;
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            TerminalOS <span className="text-xs font-mono text-distro-accent bg-distro-accent/10 px-2 py-0.5 rounded border border-distro-accent/20 ml-2">Multi-Distro</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onLogin}
            className="text-sm font-medium text-slate-400 hover:text-white transition"
          >
            Mock Login Profe
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
            Iniciar Sesión
          </button>
          <button className="px-4 py-2 text-sm font-bold bg-distro-accent text-white rounded-lg hover:bg-distro-accentHover shadow-lg shadow-distro-accent/20 transition">
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col items-center justify-center space-y-12">
        <div className="text-center max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Aprende Linux y gestiona ejercicios en tiempo real
          </h1>
          <p className="text-lg text-slate-300/90">
            Una terminal interactiva virtual completa desde tu navegador. Cambia el sabor de tu distribución favorita desde la hoja de estilos.
          </p>
        </div>

        <TerminalWidget user="guest" />
      </main>

    </div>
  );
};