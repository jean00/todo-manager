export interface ToastConfig {
  open: boolean;
  autoHideDuration?: number;
  title?: string;
  severity?: "error" | "warning" | "info" | "success";
  message?: string;
}

export interface ModalConfig {
  open: boolean;
  modalType?: "edit" | "delete" | "create" | "reminder";
  onClose?: () => void;
  defaultTitle?: string;
  defaultDescription?: string;
  onConfirm?: (args?: any) => void;
  defaultDueDate?: Date;
  backgroundColor?: string;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  backgroundColor?: string;
  isPinned?: boolean;
  dueDate?: Date;
}
