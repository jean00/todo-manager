import {
  Button,
  Paper,
  Popover,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { HexColorInput, HexColorPicker } from "react-colorful";

export interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  onConfirm: () => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const ColorPicker = ({
  color,
  setColor,
  anchorEl,
  onClose,
  onConfirm,
}: ColorPickerProps) => {
  const theme = useTheme();

  const handleClose = () => {
    setColor("");
    onClose();
  };

  const HexColorInputCustom = ({ value, onChange, ...props }: any) => {
    return (
      <HexColorInput
        {...props}
        color={value || ""}
        onChange={onChange || (() => {})}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          fontSize: "16px",
          fontFamily: "inherit",
          padding: "8px 12px",
          background: "transparent",
          color: theme.palette.text.primary,
        }}
      />
    );
  };

  return (
    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <Paper
        elevation={6}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2}>
          <HexColorPicker color={color} onChange={setColor} />
          <TextField
            slotProps={{
              input: {
                inputComponent: () =>
                  HexColorInputCustom({
                    value: color,
                    onChange: setColor,
                  }),
              },
            }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button onClick={onConfirm} sx={{ mt: 1 }}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Popover>
  );
};

export default ColorPicker;
