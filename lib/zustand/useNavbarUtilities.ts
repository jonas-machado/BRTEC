import { create } from "zustand";

interface navbarUtilitiesModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useNavbarUtilitiesModal = create<navbarUtilitiesModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNavbarUtilitiesModal;
