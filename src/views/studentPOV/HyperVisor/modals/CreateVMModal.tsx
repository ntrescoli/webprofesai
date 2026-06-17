import React from 'react';
import { useState } from 'react';
import type { DiskConfig, VirtualMachine } from '../types';

export const CreateVMModal = (
  { vms, setVms, setActiveVm }:
    {
      vms: VirtualMachine[];
      setVms: React.Dispatch<React.SetStateAction<VirtualMachine[]>>;
      setActiveVm: React.Dispatch<React.SetStateAction<string>>
    }
) => {

  // Funciones de control del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estados para el Modal de Creación
  const [newVmName, setNewVmName] = useState('');
  const [newVmType, setNewVmType] = useState('ubuntu');
  const [newVmMemory, setNewVmMemory] = useState('2048');
  const [newVmCpus, setNewVmCpus] = useState('2');

  // Estado dinámico para los discos en el formulario (por defecto empieza con un disco de 20GB)
  const [newVmDisks, setNewVmDisks] = useState<DiskConfig[]>([
    { id: `disk-${Date.now()}-0`, sizeGb: 20 }
  ]);

  // Funciones para gestionar los discos dentro del formulario del modal
  const handleAddDisk = () => {
    if (newVmDisks.length >= 4) return; // Límite lógico de 4 discos por VM
    setNewVmDisks([
      ...newVmDisks,
      { id: `disk-${Date.now()}-${newVmDisks.length}`, sizeGb: 20 }
    ]);
  };

  const handleRemoveDisk = (indexToRemove: number) => {
    if (newVmDisks.length <= 1) return; // Al menos debe tener un disco principal
    setNewVmDisks(newVmDisks.filter((_, index) => index !== indexToRemove));
  };

  const handleDiskSizeChange = (index: number, newSize: number) => {
    const updatedDisks = [...newVmDisks];
    updatedDisks[index].sizeGb = newSize;
    setNewVmDisks(updatedDisks);
  };

  // Crear nueva VM
  const handleCreateVm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVmName.trim()) return;

    const newId = `vm-${Date.now()}`;
    const newVm: VirtualMachine = {
      id: newId,
      name: newVmName,
      type: newVmType,
      icon: iconMapping[newVmType] || 'fa-server',
      disks: newVmDisks
    };

    setVms([...vms, newVm]);
    setActiveVm(newId);

    // Resetear formulario completo
    setNewVmName('');
    setNewVmType('ubuntu');
    setNewVmMemory('2048');
    setNewVmCpus('2');
    setNewVmDisks([{ id: `disk-${Date.now()}-0`, sizeGb: 20 }]);
    setShow(false);
  };

  const iconMapping: Record<string, string> = {
    'ubuntu': 'fa-terminal',
    'windows': 'fa-server',
    'debian-som': 'fa-code-branch',
    'debian-sor': 'fa-layer-group'
  };

  return (
    <>
      <div className="pt-4 mt-4 border-t border-distro-border/50">
        <button
          onClick={handleShow}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-bold rounded-lg transition border border-distro-accent/30 text-distro-accent hover:bg-distro-accent hover:text-white"
        >
          <i className="fa-solid fa-circle-plus"></i>
          <span>Nueva VM</span>
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-md bg-distro-header border border-distro-border rounded-xl shadow-2xl my-8">
            <div className="bg-distro-border/30 px-5 py-4 border-b border-distro-border flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <span className="text-distro-accent">❯</span>
                <span>Provisionar Nueva VM</span>
              </h3>
              <button onClick={handleClose} className="text-slate-400 hover:text-white transition text-sm p-1">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleCreateVm} className="p-6 space-y-5">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Nombre de la Máquina:</label>
                <input type="text" required value={newVmName} onChange={(e) => setNewVmName(e.target.value)} placeholder="Ej. Servidor Almacenamiento" className="w-full bg-distro-bg border border-distro-border rounded p-2 text-sm text-white focus:border-distro-accent outline-none" />
              </div>

              {/* Plantilla OS */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Plantilla de Distribución:</label>
                <select value={newVmType} onChange={(e) => setNewVmType(e.target.value)} className="w-full bg-distro-bg border border-distro-border rounded p-2 text-sm text-white focus:border-distro-accent outline-none cursor-pointer">
                  <option value="ubuntu">Ubuntu 24.04 SI</option>
                  <option value="windows">Windows Server 2019</option>
                  <option value="debian-som">Debian SOM</option>
                  <option value="debian-sor">Debian SOR</option>
                </select>
              </div>

              {/* Hardware Básico */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Memoria RAM:</label>
                  <select value={newVmMemory} onChange={(e) => setNewVmMemory(e.target.value)} className="w-full bg-distro-bg border border-distro-border rounded p-2 text-xs text-white focus:border-distro-accent outline-none">
                    <option value="1024">1024 MB (1 GB)</option>
                    <option value="2048">2048 MB (2 GB)</option>
                    <option value="4096">4096 MB (4 GB)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">Núcleos vCPU:</label>
                  <select value={newVmCpus} onChange={(e) => setNewVmCpus(e.target.value)} className="w-full bg-distro-bg border border-distro-border rounded p-2 text-xs text-white focus:border-distro-accent outline-none">
                    <option value="1">1 Cores</option>
                    <option value="2">2 Cores</option>
                    <option value="4">4 Cores</option>
                  </select>
                </div>
              </div>

              {/* CONFIGURACIÓN DE DISCOS (DINÁMICA) */}
              <div className="space-y-3 pt-2 border-t border-distro-border/40">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                    Discos de Almacenamiento ({newVmDisks.length}/4):
                  </label>
                  <button
                    type="button"
                    disabled={newVmDisks.length >= 4}
                    onClick={handleAddDisk}
                    className="text-[11px] font-bold px-2 py-1 rounded bg-distro-border/50 text-distro-accent border border-distro-accent/20 hover:bg-distro-accent hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <i className="fa-solid fa-plus mr-1"></i> Añadir Volumen
                  </button>
                </div>

                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                  {newVmDisks.map((disk, index) => (
                    <div key={disk.id} className="bg-distro-bg/60 border border-distro-border rounded p-3 space-y-2 relative">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 font-semibold">
                          {index === 0 ? '📁 /dev/sda (Sistema)' : `💾 /dev/sd${String.fromCharCode(97 + index)} (Datos)`}
                        </span>
                        <span className="text-white font-bold">{disk.sizeGb} GB</span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="10"
                          max="200"
                          step="5"
                          value={disk.sizeGb}
                          onChange={(e) => handleDiskSizeChange(index, parseInt(e.target.value))}
                          className="flex-1 accent-distro-accent h-1.5 bg-distro-border rounded-lg appearance-none cursor-pointer"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDisk(index)}
                            className="text-slate-500 hover:text-red-400 transition"
                            title="Quitar disco"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Envío */}
              <div className="pt-4 border-t border-distro-border/30 flex items-center justify-end space-x-3">
                <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition">Cancelar</button>
                <button type="submit" className="flex items-center space-x-2 px-5 py-2 text-sm font-bold rounded-lg bg-distro-accent text-white hover:bg-distro-accent/90 transition shadow-md">
                  <i className="fa-solid fa-plus text-xs"></i>
                  <span>Añadir Máquina</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </>
  )

}