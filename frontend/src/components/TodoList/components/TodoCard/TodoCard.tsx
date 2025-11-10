import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { TodoCardProps } from "./TodoCard.type";
import { useState } from "react";
import TransitionsModal from "../../../ui/TransitionsModal";

const options = [
  "Edit",
  "Delete",
  // "Mark as Completed",
  // "Assign to User",
  // "Set Due Date",
];

const ITEM_HEIGHT = 48;

const TodoCard = ({ title, description }: TodoCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOnClick = (option: string) => {
    switch (option) {
      case "Edit":
        setOpenModal(true);
        break;
      case "Delete":
        // Handle delete action
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <>
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
                onClick={() => handleOnClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </CardActions>
      </Card>
      <TransitionsModal open={openModal} onClose={() => setOpenModal(false)}>
        <Typography variant="h6" component="h2">
          Edit Todo
        </Typography>
        <form>
          <TextField id="filled-basic" label="Search" variant="standard" />
        </form>
      </TransitionsModal>
    </>
  );
};

export default TodoCard;
