import {
  Box,
  Fade,
  Modal,
  useTheme,
  TextField,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import type { ModalConfig } from "../../types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CommonModal = ({
  open,
  modalType,
  onClose,
  onConfirm,
  defaultTitle,
  defaultDescription,
  defaultDueDate,
  backgroundColor,
}: ModalConfig) => {
  const theme = useTheme();
  const [edited, setEdited] = useState<{
    title: string;
    description: string;
    dueDate?: Date | null;
    backgroundColor?: string;
  }>({
    title: defaultTitle || "",
    description: defaultDescription || "",
    dueDate: defaultDueDate || null,
    backgroundColor: backgroundColor || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdited((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onConfirm && onConfirm(edited);
    onClose && onClose();
  };

  const handleConfirmDelete = () => {
    onConfirm && onConfirm();
    onClose && onClose();
  };

  useEffect(() => {
    setEdited({
      title: defaultTitle || "",
      description: defaultDescription || "",
      dueDate: defaultDueDate,
    });
  }, [defaultTitle, defaultDescription, open]);

  const style = useMemo(
    () => ({
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "90%", sm: 500 },
      bgcolor: backgroundColor || theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: 3,
      boxShadow: 24,
      p: 2,
      outline: "none",
    }),
    [theme, backgroundColor]
  );

  if (!open) {
    return null;
  }

  if (modalType === "edit") {
    return (
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              error={edited.title.trim() === ""}
              helperText={
                edited.title.trim() === "" ? "Title is required" : undefined
              }
              variant="standard"
              placeholder="Titolo"
              name="title"
              value={edited.title}
              onChange={handleChange}
              fullWidth
              InputProps={{ disableUnderline: edited.title.trim() !== "" }}
              sx={{ mb: 1, fontWeight: "bold", fontSize: "1.1rem" }}
            />
            <TextField
              error
              variant="standard"
              placeholder="Note..."
              name="description"
              value={edited.description}
              onChange={handleChange}
              multiline
              rows={20}
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{
                mb: 2,
                color: "white",
                minHeight: "100px",
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={edited.title.trim() === ""}
                onClick={handleSave}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    );
  }

  // Render Delete Confirmation Modal
  if (modalType === "delete") {
    return (
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" gutterBottom>
              Are you sure you want to delete "{defaultTitle}"?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete}>Confirm</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    );
  }

  if (modalType === "create") {
    return (
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              error={edited.title.trim() === ""}
              helperText={
                edited.title.trim() === "" ? "Title is required" : undefined
              }
              variant="standard"
              placeholder="Title"
              name="title"
              value={edited.title}
              onChange={handleChange}
              fullWidth
              InputProps={{ disableUnderline: edited.title.trim() !== "" }}
              sx={{ mb: 1, fontWeight: "bold", fontSize: "1.1rem" }}
            />
            <TextField
              variant="standard"
              placeholder="Notes..."
              name="description"
              value={edited.description}
              onChange={handleChange}
              multiline
              rows={20}
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{
                mb: 2,
                color: "white",
                minHeight: "100px",
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={edited.title.trim() === ""}
                onClick={handleSave}
              >
                Create
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    );
  }

  if (modalType === "reminder") {
    return (
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Stack sx={style} spacing={2}>
            <Typography variant="h6" gutterBottom>
              Remind me
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={edited.dueDate ? dayjs(edited.dueDate) : null}
                label="Add a due date"
                sx={{ width: "100%" }}
                ampm={false}
                onChange={(value) => {
                  setEdited((prev) => ({
                    ...prev,
                    dueDate: value ? value.toDate() : undefined,
                  }));
                }}
              />
            </LocalizationProvider>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onConfirm &&
                    onConfirm({
                      dueDate: edited.dueDate,
                    });
                  onClose && onClose();
                }}
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    );
  }

  return null;
};

export default CommonModal;
