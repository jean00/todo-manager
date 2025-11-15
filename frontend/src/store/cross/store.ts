import { create } from "zustand";
import type { ModalConfig, ToastConfig } from "../../types";

export type ModalType = "edit" | "delete" | "create" | null;

declare interface CrossInitialState {
  modalConfig: ModalConfig;
  toastConfig: ToastConfig;
}

declare interface CrossActions {
  setModalConfig: (config: ModalConfig) => void;
  setToastConfig: (config: ToastConfig) => void;
}

export type CrossStore = CrossInitialState & CrossActions;

const crossInitialState: CrossInitialState = {
  modalConfig: {
    open: false,
    modalType: undefined,
    onClose: () => {},
    defaultTitle: "",
    defaultDescription: "",
    onConfirm: () => {},
  },
  toastConfig: {
    open: false,
    message: "",
    autoHideDuration: 3000,
    severity: "info",
    title: "",
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
  setModalConfig: (config: ModalConfig) =>
    set((state) => ({
      modalConfig: {
        ...state.modalConfig,
        ...config,
      },
    })),
  setToastConfig: (config: ToastConfig) =>
    set((state) => ({
      toastConfig: {
        ...state.toastConfig,
        ...config,
      },
    })),
});

export const useCrossStore = create<CrossStore>((set) => ({
  ...crossInitialState,
  ...crossActions(set),
}));
