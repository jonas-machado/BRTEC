import { create } from "zustand";

interface PerfilModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePerfilModal = create<PerfilModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePerfilModal;
