import { Hypervisor } from './studentPOV/HyperVisor/Hypervisor';

export const TerminalView = () => {

  return (
    <div className="h-screen flex overflow-hidden bg-distro-bg text-distro-text relative">
      <Hypervisor />
    </div>
  );
};