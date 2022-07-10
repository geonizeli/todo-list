import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { formatDate } from "../../../../../utils/formatDate";
import { EditTaskDialog } from "./EditTaskDialog";

export type Task = {
  id: number;
  description: string;
  createdAt: string;
  finishedAt?: string;
};

export type TasksListItemProps = {
  task: Task;
  onCheck: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

export const TasksListItem = ({
  task,
  onCheck,
  onDelete,
}: TasksListItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const finished = !!task.finishedAt;
  const blockInteration = finished || isLoading;

  const handleCheck = () => {
    setIsLoading(true);
    onCheck(task.id);
  };

  const handleDelete = () => {
    setIsLoading(true);
    onDelete(task.id);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const tooltipText = `
    ${task.finishedAt ? `Finished at: ${formatDate(task.finishedAt)} |` : ""}
    ${`Created at: ${formatDate(task.createdAt)}`}
  `;

  return (
    <>
      <EditTaskDialog
        task={task}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
      <Tooltip title={tooltipText} placement="top-start">
        <ListItem
          secondaryAction={
            finished ? null : (
              <>
                <IconButton
                  onClick={handleEdit}
                  disabled={blockInteration}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ ml: 2 }}
                  onClick={handleDelete}
                  disabled={blockInteration}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
        >
          <ListItemAvatar>
            <Checkbox
              onChange={handleCheck}
              disabled={blockInteration}
              checked={blockInteration}
            />
          </ListItemAvatar>
          <ListItemText primary={task.description} />
        </ListItem>
      </Tooltip>
    </>
  );
};
