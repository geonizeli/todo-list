import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useProject } from "../../../hooks/useProject";

export type DeleteProjectDialogProps = {
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

export const DeleteProjectDialog = ({
  open,
  setOpen,
}: DeleteProjectDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { project, projectMutate } = useProject();
  const { apiClient } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setIsLoading(true);

    apiClient(`projects/${project.id}`, {
      method: "DELETE",
    }).then(() => {
      projectMutate();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Attention! This is an irreversible action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
