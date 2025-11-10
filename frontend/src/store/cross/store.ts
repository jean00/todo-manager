import { create } from "zustand";

export type ModalType = "edit" | "delete" | null;

declare interface CrossInitialState {
  modalConfig: {
    open: boolean;
    modalType: ModalType;
    onClose: () => void;
    defaultTitle: string;
    defaultDescription?: string;
    onConfirm: (args?: any) => void;
  };
}

declare interface CrossActions {
  setModalConfig: (config: Partial<CrossInitialState["modalConfig"]>) => void;
}

export type CrossStore = CrossInitialState & CrossActions;

const crossInitialState: CrossInitialState = {
  modalConfig: {
    open: false,
    modalType: null,
    onClose: () => {},
    defaultTitle: "",
    defaultDescription: "",
    onConfirm: () => {},
  },
};

const crossActions = (set: {
  (
    partial:
      | CrossStore
      | Partial<CrossStore>
      | ((state: CrossStore) => CrossStore | Partial<CrossStore>),
    replace?: false
  ): void;
  (
    state: CrossStore | ((state: CrossStore) => CrossStore),
    replace: true
  ): void;
}) => ({
  setModalConfig: (config: Partial<CrossInitialState["modalConfig"]>) =>
    set((state) => ({
      modalConfig: {
        ...state.modalConfig,
        ...config,
      },
    })),
});

export const useCrossStore = create<CrossStore>((set) => ({
  ...crossInitialState,
  ...crossActions(set),
}));
