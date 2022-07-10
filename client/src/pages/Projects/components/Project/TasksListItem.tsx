import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { useState } from "react";

export type Task = {
  id: number;
  description: string;
  createdAt: Date;
  finishedAt?: Date;
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
  const finished = !!task.finishedAt;
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = () => {
    setIsLoading(true);
    onCheck(task.id);
  };

  const handleDelete = () => {
    setIsLoading(true);
    onDelete(task.id);
  };

  const blockInteration = finished || isLoading;

  return (
    <ListItem
      secondaryAction={
        finished ? null : (
          <IconButton onClick={handleDelete} disabled={blockInteration} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )
      }
    >
      <ListItemAvatar>
        <Checkbox onChange={handleCheck} disabled={blockInteration} checked={blockInteration} />
      </ListItemAvatar>
      <ListItemText primary="Single-line item" />
    </ListItem>
  );
};
