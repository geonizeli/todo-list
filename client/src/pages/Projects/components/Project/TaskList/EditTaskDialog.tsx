import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../../hooks/useAuth";
import { useProject } from "../../../../../hooks/useProject";
import { Task } from "./TasksListItem";

type EditProjectForm = {
  description: string;
};

export type EditTaskDialogProps = {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
  task: Task;
};

export const EditTaskDialog = ({
  task,
  open,
  setOpen,
}: EditTaskDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useAuth();
  const { tasksMutate, project } = useProject();
  const { register, handleSubmit, reset } = useForm<EditProjectForm>({
    defaultValues: task,
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<EditProjectForm> = (data) => {
    setIsLoading(true);

    apiClient(`projects/${project.id}/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then(() => {
      tasksMutate();
      setIsLoading(false);
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Rename task</DialogTitle>
        <DialogContent>
          <TextField
            {...register("description")}
            disabled={isLoading}
            autoFocus
            fullWidth
            margin="dense"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Rename
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
