import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { TodoCardProps } from "./TodoCard.type";
import { useState } from "react";
import { useCrossStore } from "../../../../store/cross/store";
import { todosService } from "../../../../service/todosService";

const options = [
  "Edit",
  "Delete",
  // "Mark as Completed",
  // "Assign to User",
  // "Set Due Date",
];

const ITEM_HEIGHT = 48;

const TodoCard = ({ id, title, description }: TodoCardProps) => {
  console.log({
    id,
    title,
    description,
  });

  const { getTodos, deleteTodo, updateTodo } = todosService();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setModalConfig } = useCrossStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      await getTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setModalConfig({ open: false });
      setAnchorEl(null);
    }
  };

  const handleUpdate = async (edited: {
    title: string;
    description: string;
  }) => {
    try {
      await updateTodo(id, edited);
      await getTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setModalConfig({ open: false });
      setAnchorEl(null);
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
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
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
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="open menu"
          aria-controls={open ? "menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          // onClose={handleClose}
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
  );
};

export default TodoCard;
