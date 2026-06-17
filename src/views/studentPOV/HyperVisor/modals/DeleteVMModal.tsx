import React from 'react';
import { useState } from 'react';
import type { VirtualMachine } from '../types';


export const DeleteVMModal = (
  { vm, vms, setVms, activeVm, setActiveVm }:
    {
      vm: VirtualMachine;
      vms: VirtualMachine[];
      setVms: React.Dispatch<React.SetStateAction<VirtualMachine[]>>;
      activeVm: string;
      setActiveVm: React.Dispatch<React.SetStateAction<string>>;
    }
) => {

  // Funciones de control del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estados para el Modal de Eliminación
  const [vmToDelete, setVmToDelete] = useState<VirtualMachine | null>(null);

  const triggerDeleteModal = (e: React.MouseEvent, vm: VirtualMachine) => {
    e.stopPropagation();
    setVmToDelete(vm);
    handleShow();
  };

  const handleDeleteVm = () => {
    if (!vmToDelete) return;
    const updatedVms = vms.filter(vm => vm.id !== vmToDelete.id);
    setVms(updatedVms);
    if (activeVm === vmToDelete.id && updatedVms.length > 0) {
      setActiveVm(updatedVms[0].id);
    }
    handleClose();
    setVmToDelete(null);
  };

  return (
    <>
      <button
        onClick={(e) => triggerDeleteModal(e, vm)}
        title="Eliminar máquina"
        className="absolute right-3 p-1 text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100 rounded z-10"
      >
        <i className="fa-solid fa-trash text-xs"></i>
      </button>


      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-distro-header border border-red-950 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-red-950/20 px-5 py-4 border-b border-red-900/30 flex items-center space-x-3">
              <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 className="text-sm font-bold text-red-200 font-mono">Confirmar destrucción</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                ¿Estás seguro de que deseas purgar la máquina virtual <span className="text-white font-mono font-bold bg-distro-bg px-1.5 py-0.5 rounded border border-distro-border">{vmToDelete.name}</span>?
              </p>
              <p className="text-[11px] text-red-400/80 font-mono">⚠️ Esta acción liberará los recursos y borrará los datos volátiles del disco.</p>
            </div>
            <div className="px-5 py-3.5 bg-distro-bg/50 border-t border-distro-border/50 flex items-center justify-end space-x-2">
              <button type="button" onClick={() => { handleClose; setVmToDelete(null); }} className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition">Abortar</button>
              <button type="button" onClick={handleDeleteVm} className="px-4 py-1.5 text-xs font-bold rounded bg-red-600 text-white hover:bg-red-500 transition shadow">Destruir Instancia</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}