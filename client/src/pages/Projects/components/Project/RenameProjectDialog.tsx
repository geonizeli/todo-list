import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import { useProject } from "../../../../hooks/useProject";

type RenameProjectForm = {
  name: string;
};

export type RenameProjectDialogProps = {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

export const RenameProjectDialog = ({
  open,
  setOpen,
}: RenameProjectDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useAuth();
  const { projectMutate, project } = useProject();
  const { register, handleSubmit, setValue } = useForm<RenameProjectForm>();

  useEffect(() => {
    setValue("name", project.name);
  }, [setValue, project.name]);

  const handleClose = () => {
    setValue("name", project.name);
    setOpen(false);
  };

  const onSubmit: SubmitHandler<RenameProjectForm> = (data) => {
    setIsLoading(true);

    apiClient(`projects/${project.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: data.name,
      }),
    }).then(() => {
      projectMutate();
      setIsLoading(false);
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Rename project</DialogTitle>
        <DialogContent>
          <TextField
            required
            {...register("name")}
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
