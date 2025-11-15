import { Snackbar, Alert, AlertTitle } from "@mui/material";
import type { ToastConfig } from "../../types";

interface ToastProps {
  toastConfig: ToastConfig;
  handleClose: () => void;
}

const Toast = ({ toastConfig, handleClose }: ToastProps) => {
  return (
    <Snackbar
      open={toastConfig.open}
      autoHideDuration={toastConfig.autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={toastConfig.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toastConfig.title && <AlertTitle>{toastConfig.title}</AlertTitle>}
        {toastConfig.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
