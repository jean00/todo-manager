import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import type { TodoCardProps } from "./TodoCard.type";
import { useState } from "react";
import { useCrossStore } from "../../../../store/cross/store";
import { todosService } from "../../../../service/todosService";
import ColorPicker from "../../../ui/ColorPicker";

const options = [
  "Edit",
  "Delete",
  // "Mark as Completed",
  // "Assign to User",
  // "Set Due Date",
];

const ITEM_HEIGHT = 48;

const TodoCard = ({
  id,
  title,
  description,
  backgroundColor,
}: TodoCardProps) => {
  const { getTodos, deleteTodo, updateTodo } = todosService();
  const [anchorEl, setAnchorEl] = useState<{
    colorPicker: HTMLElement | null;
    menu: HTMLElement | null;
  }>({
    colorPicker: null,
    menu: null,
  });
  const open = Boolean(anchorEl.menu);
  const { setModalConfig } = useCrossStore();
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = useState(backgroundColor || "");

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      await getTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setModalConfig({ open: false });
      setAnchorEl((prev) => ({
        ...prev,
        menu: null,
      }));
    }
  };

  const handleUpdate = async (edited: {
    title?: string;
    description?: string;
    backgroundColor?: string;
  }) => {
    try {
      await updateTodo(id, edited);
      await getTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setModalConfig({ open: false });
      setAnchorEl((prev) => ({
        ...prev,
        menu: null,
      }));
    }
  };

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case "Edit":
        setModalConfig({
          open: true,
          modalType: "edit",
          defaultTitle: title,
          defaultDescription: description,
          onClose: () => {
            setModalConfig({ open: false });
          },
          onConfirm: handleUpdate,
        });
        break;
      case "Delete":
        setModalConfig({
          open: true,
          modalType: "delete",
          defaultTitle: title,
          onClose: () => {
            setModalConfig({ open: false });
          },
          onConfirm: handleDelete,
        });
        break;
      default:
        break;
    }
    setAnchorEl((prev) => ({
      ...prev,
      menu: null,
    }));
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: selectedColor || theme.palette.background.paper,
          borderRadius: "0.75rem",
          "& .actions": {
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.2s ease, visibility 0.2s ease",
          },
          "&:hover .actions": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <CardHeader
          title={title}
          action={
            <IconButton className="actions">
              <PushPinOutlinedIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 10,
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
          className="actions"
        >
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="color"
              onClick={(event) =>
                setAnchorEl((prev) => ({
                  ...prev,
                  colorPicker: event.currentTarget,
                }))
              }
            >
              <ColorLensOutlinedIcon />
            </IconButton>
            <IconButton aria-label="reminder">
              <AddAlertOutlinedIcon />
            </IconButton>
          </Stack>
          <IconButton
            aria-label="open menu"
            aria-controls={open ? "menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(event) =>
              setAnchorEl((prev) => ({
                ...prev,
                menu: event.currentTarget,
              }))
            }
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl.menu}
            open={open}
            onClose={() => setAnchorEl((prev) => ({ ...prev, menu: null }))}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                // selected={option === "Pyxis"}
                onClick={() => handleMenuOptionClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </CardActions>
      </Card>
      <ColorPicker
        color={selectedColor || theme.palette.background.paper}
        setColor={setSelectedColor}
        anchorEl={anchorEl.colorPicker}
        onClose={() => setAnchorEl((prev) => ({ ...prev, colorPicker: null }))}
        onConfirm={() => {
          handleUpdate({ backgroundColor: selectedColor });
        }}
      />
    </>
  );
};

export default TodoCard;
