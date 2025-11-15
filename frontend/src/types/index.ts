export interface ToastConfig {
  open: boolean;
  autoHideDuration?: number;
  title?: string;
  severity?: "error" | "warning" | "info" | "success";
  message?: string;
}

export interface ModalConfig {
  open: boolean;
  modalType?: "edit" | "delete" | "create";
  onClose?: () => void;
  defaultTitle?: string;
  defaultDescription?: string;
  onConfirm?: (args?: any) => void;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  backgroundColor?: string;
}
