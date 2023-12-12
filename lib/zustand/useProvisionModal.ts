import { create } from "zustand";

interface ProvisionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProvisionModal = create<ProvisionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProvisionModal;
