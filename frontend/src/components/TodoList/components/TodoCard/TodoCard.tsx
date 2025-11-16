import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import type { TodoCardProps } from "./TodoCard.type";
import { useState } from "react";
import { useCrossStore } from "../../../../store/cross/store";
import ColorPicker from "../../../ui/ColorPicker";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";
import type { ModalConfig } from "../../../../types";
import type { MouseEvent } from "react";

const TodoCard = ({
  _id: id,
  title,
  description,
  backgroundColor,
  isPinned,
  dueDate,
  onDelete,
  onUpdate,
}: TodoCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { setModalConfig } = useCrossStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [todo, setTodo] = useState({
    isPinned: isPinned || false,
    backgroundColor: backgroundColor || "",
  });

  const handleDelete = async () => {
    await onDelete(id);
    setModalConfig({ open: false });
    setAnchorEl(null);
  };

  const handleUpdate = async (edited: {
    title?: string;
    description?: string;
    backgroundColor?: string;
    isPinned?: boolean;
    dueDate?: Date | null;
  }) => {
    await onUpdate(id, edited);
    setModalConfig({ open: false });
    setAnchorEl(null);
  };

  const handleOnClick = (e: MouseEvent<Element>, modalConfig: ModalConfig) => {
    e.stopPropagation();
    setModalConfig({
      ...modalConfig,
    });
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor:
            todo.backgroundColor || theme.palette.background.paper,
          borderRadius: "0.75rem",
          ...(!isMobile && {
            "& .actions": {
              opacity: 0,
              visibility: "hidden",
              transition: "opacity 0.2s ease, visibility 0.2s ease",
            },
            "&:hover .actions": {
              opacity: 1,
              visibility: "visible",
            },
          }),
        }}
      >
        <CardActionArea
          onClick={(e) =>
            handleOnClick(e, {
              open: true,
              modalType: "edit",
              defaultTitle: title,
              defaultDescription: description,
              onClose: () => {
                setModalConfig({ open: false });
              },
              onConfirm: handleUpdate,
            })
          }
        >
          <CardHeader
            title={title}
            action={
              <IconButton className="actions">
                {todo.isPinned ? (
                  <PushPinIcon
                    onClick={() => handleUpdate({ isPinned: !todo.isPinned })}
                  />
                ) : (
                  <PushPinOutlinedIcon
                    onClick={() => handleUpdate({ isPinned: !todo.isPinned })}
                  />
                )}
              </IconButton>
            }
          />

          <CardContent
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
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
            {dueDate && (
              <Chip
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "fit-content",
                }}
                variant="outlined"
                label={dayjs(dueDate).format("MMM D, YYYY h:mm A")}
                onClick={(e) =>
                  handleOnClick(e, {
                    open: true,
                    modalType: "reminder",
                    defaultDueDate: dueDate,
                    onClose: () => {
                      setModalConfig({ open: false });
                    },
                    onConfirm: handleUpdate,
                  })
                }
                onDelete={(e) => {
                  e.stopPropagation();
                  handleUpdate({ dueDate: null });
                }}
              />
            )}
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "space-between",
              zIndex: 9999,
            }}
            className="actions"
          >
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Change todo background color"
                onClick={(event) => {
                  event.stopPropagation();
                  setAnchorEl(event.currentTarget);
                }}
              >
                <ColorLensOutlinedIcon />
              </IconButton>
              <IconButton aria-label="Add reminder">
                <AddAlertOutlinedIcon
                  onClick={(e) =>
                    handleOnClick(e, {
                      open: true,
                      modalType: "reminder",
                      defaultDueDate: dueDate,
                      onClose: () => {
                        setModalConfig({ open: false });
                      },
                      onConfirm: handleUpdate,
                    })
                  }
                />
              </IconButton>
            </Stack>
            <IconButton
              aria-label="Delete todo"
              onClick={(e) =>
                handleOnClick(e, {
                  open: true,
                  modalType: "delete",
                  defaultTitle: title,
                  onClose: () => {
                    setModalConfig({ open: false });
                  },
                  onConfirm: handleDelete,
                })
              }
            >
              <DeleteOutlineIcon />
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
      <ColorPicker
        color={todo.backgroundColor || theme.palette.background.paper}
        setColor={(color) =>
          setTodo((prev) => ({ ...prev, backgroundColor: color }))
        }
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onConfirm={() => {
          handleUpdate({ backgroundColor: todo.backgroundColor });
        }}
      />
    </>
  );
};

export default TodoCard;
