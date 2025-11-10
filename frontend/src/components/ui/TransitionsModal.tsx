import { Backdrop, Box, Fade, Modal } from "@mui/material";
import type { ReactNode } from "react";

interface TransitionsModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const TransitionsModal = ({
  open,
  onClose,
  children,
}: TransitionsModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
