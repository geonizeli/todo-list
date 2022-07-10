import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { formatDate } from "../../../../utils/formatDate";

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
    <Tooltip
      title={`
        ${
          task.finishedAt ? `Finished at: ${formatDate(task.finishedAt)} |` : ""
        }
        ${`Created at: ${formatDate(task.createdAt)}`}
      `}
      placement="top-start"
    >
      <ListItem
        secondaryAction={
          finished ? null : (
            <IconButton
              onClick={handleDelete}
              disabled={blockInteration}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
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
  );
};
