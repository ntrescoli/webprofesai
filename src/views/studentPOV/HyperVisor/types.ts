export interface DiskConfig {
  id: string;
  sizeGb: number;
}

export interface VirtualMachine {
  id: string;
  name: string;
  type: string;
  icon: string;
  disks: DiskConfig[];
}