import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { useAuth } from "../../../../hooks/useAuth";
import { APIProjectList } from "../../Projects";

type NewProjectForm = {
  name: string;
};

type NewProjectActionProps = {
  mutate: KeyedMutator<APIProjectList>;
};

export const NewProjectAction = ({ mutate }: NewProjectActionProps) => {
  const { register, handleSubmit, reset } = useForm<NewProjectForm>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useAuth();

  const onSubmit: SubmitHandler<NewProjectForm> = (data) => {
    setIsLoading(true);
    apiClient("projects", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(async () => {
      reset();
      await mutate();
      setIsLoading(false);
      setOpen(false);
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <Button onClick={handleOpen} variant="contained" size="large">
          New project
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New project</DialogTitle>
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
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
