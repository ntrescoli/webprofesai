import React from 'react';
import { useState } from 'react';
import type { VirtualMachine } from './types';
import { CreateVMModal } from './modals/CreateVMModal';
import { TerminalWidget } from '../../../components/TerminalWidget';
import { DeleteVMModal } from './modals/DeleteVMModal';

export const Hypervisor = () => {

  const [vms, setVms] = useState<VirtualMachine[]>([
    { id: 'ubuntu', name: 'Ubuntu 24.04 SI', type: 'ubuntu', icon: 'fa-terminal', disks: [{ id: 'd1', sizeGb: 25 }] },
    { id: 'windows', name: 'Windows Server 2019', type: 'windows', icon: 'fa-server', disks: [{ id: 'd1', sizeGb: 50 }] },
    { id: 'debian-som', name: 'Debian SOM', type: 'debian-som', icon: 'fa-code-branch', disks: [{ id: 'd1', sizeGb: 20 }] },
    { id: 'debian-sor', name: 'Debian SOR', type: 'debian-sor', icon: 'fa-layer-group', disks: [{ id: 'd1', sizeGb: 20 }] },
  ]);

  const [activeVm, setActiveVm] = useState('ubuntu');

  return (
    <>
      {/* Sidebar Izquierda: VM Hypervisor */}
      <aside className="w-64 bg-distro-header border-r border-distro-border flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          <div className="p-6 border-b border-distro-border">
            <div className="flex items-center space-x-2.5">
              <div className="bg-distro-accent text-white px-2 py-0.5 rounded font-mono font-bold text-xs shadow">🐧</div>
              <span className="font-bold text-lg text-white font-sans tracking-tight">VM Hypervisor</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {vms.map((vm) => (
              <div key={vm.id} className="relative flex items-center group">
                <button
                  onClick={() => setActiveVm(vm.id)}
                  className={`w-full flex items-center space-x-3 pl-4 pr-10 py-2.5 text-sm font-medium rounded-lg transition ${activeVm === vm.id ? 'bg-distro-border text-white' : 'text-slate-300 hover:bg-distro-border/50 hover:text-white'
                    }`}
                >
                  <i className={`fa-solid ${vm.icon} text-distro-accent shrink-0`}></i>
                  <span className="truncate pr-2">{vm.name}</span>
                </button>
                { /* Modal de eliminación de VM */ }
                <DeleteVMModal vm={vm} vms={vms} setVms={setVms} activeVm={activeVm} setActiveVm={setActiveVm} />
              </div>
            ))}

            {/* Botón para abrir el modal de creación de VM */}
            <CreateVMModal vms={vms} setVms={setVms} setActiveVm={setActiveVm} />
          </nav>
        </div>
      </aside>

      {/* Área Central: Consola / Terminal */}
      <main className="p-8 flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col min-h-[400px] bg-distro-header/30 rounded-xl border border-distro-border p-4 shadow-inner">
          {vms.length > 0 ? (
            <div className="flex-1 flex flex-col">
              {/* Información de almacenamiento de la VM activa en la cabecera */}
              <div className="mb-4 text-xs font-mono text-slate-400 flex items-center space-x-4 border-b border-distro-border/30 pb-2">
                <span><i className="fa-solid fa-hard-drive text-distro-accent mr-1"></i> Discos adjuntos: {vms.find(v => v.id === activeVm)?.disks.length}</span>
                <span className="text-slate-500">|</span>
                <span>Capacidad total: {vms.find(v => v.id === activeVm)?.disks.reduce((acc, d) => acc + d.sizeGb, 0)} GB</span>
              </div>
              <TerminalWidget user="nico" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 font-mono text-sm">
              <i className="fa-solid fa-server text-3xl mb-2 opacity-40"></i>
              <span>No hay ninguna máquina virtual activa.</span>
            </div>
          )}
        </div>
      </main>

    </>
  );
};