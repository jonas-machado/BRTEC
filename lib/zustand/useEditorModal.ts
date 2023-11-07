import { create } from "zustand";

interface EditorModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditorModal = create<EditorModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditorModal;
