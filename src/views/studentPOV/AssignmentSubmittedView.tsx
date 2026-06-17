import React from 'react';

interface AssignmentSubmittedViewProps {
  examTitle?: string;
  onDownloadJson?: () => void;
}

export const AssignmentSubmittedView = ({ 
  examTitle = "Título del examen", 
  onDownloadJson 
}: AssignmentSubmittedViewProps) => {

  const handleDownload = () => {
    if (onDownloadJson) {
      onDownloadJson();
    } else {
      // Lógica de descarga por defecto (simulación)
      const mockData = { status: "submitted", timestamp: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `comprobante-${examTitle.toLowerCase().replace(/\s+/g, '-')}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-8 flex-1 flex flex-col space-y-6 bg-distro-bg text-distro-text">
      
      {/* Cabecera de la Vista */}
      <div className="border-b border-distro-border/50 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
          {examTitle}
        </h2>
        <p className="text-sm text-emerald-400 mt-1 font-mono flex items-center space-x-2">
          <i className="fa-solid fa-circle-check"></i>
          <span>Examen enviado con éxito al servidor (Estado: SUCCESS)</span>
        </p>
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 flex items-start justify-start max-w-xl">
        <section className="w-full bg-distro-header border border-distro-border rounded-xl shadow-lg overflow-hidden">
          
          {/* Header del Panel (Estilo Ventana de Terminal) */}
          <div className="bg-distro-border/30 px-5 py-3 border-b border-distro-border flex items-center justify-between">
            <h1 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <span className="text-emerald-500">❯</span>
              <span>Comprobante de Entrega</span>
            </h1>
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-700 block"></span>
              <span className="w-3 h-3 rounded-full bg-slate-700 block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/50 block"></span>
            </div>
          </div>

          {/* Cuerpo del Mensaje */}
          <div className="p-6 space-y-5">
            
            {/* Mensaje de Advertencia Estilo Alerta del Sistema */}
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2.5 text-amber-400">
                <i className="fa-solid fa-triangle-exclamation text-sm"></i>
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  ACCIÓN REQUERIDA OBLIGATORIA
                </h4>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Para que el examen sea calificado válidamente, debes **descargar el archivo JSON** de comprobante mediante el botón inferior y **subirlo manualmente al Aula Virtual**. Este archivo actúa como tu firma digital de entrega.
              </p>
            </div>

            {/* Caja de Log Técnico de Confirmación */}
            <div className="bg-distro-bg/80 border border-distro-border rounded p-3 font-mono text-[11px] text-slate-400 space-y-1">
              <p><span className="text-slate-600">[INFO]</span> Virtual machines detached successfully.</p>
              <p><span className="text-slate-600">[INFO]</span> Packaging local state encrypted payload...</p>
              <p><span className="text-emerald-500">[READY]</span> receipt_checksum_sha256 generated.</p>
            </div>

            {/* Botón de Descarga Prominente */}
            <div className="pt-2">
              <button 
                type="button"
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2.5 px-5 py-3 text-sm font-bold rounded-lg bg-distro-accent text-white hover:bg-distro-accent/90 transition shadow-md active:scale-[0.99]"
              >
                <i className="fa-solid fa-file-arrow-down text-base animate-bounce"></i>
                <span>Descargar Comprobante (.json)</span>
              </button>
            </div>

          </div>

          {/* Status Bar */}
          <div className="px-6 py-2.5 bg-distro-border/10 border-t border-distro-border/30 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>status: 0 (exit success)</span>
            <span>v1.2.4-stable</span>
          </div>

        </section>
      </div>
    </div>
  );
};