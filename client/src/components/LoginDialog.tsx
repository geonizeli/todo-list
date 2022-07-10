import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginDialog = () => {
  const { isLoginDialogOpen, setIsLoginDialogOpen, login } = useAuth();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data.email, data.password);
  };
  const handleClose = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <Dialog open={isLoginDialogOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            required
            {...register("email")}
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            {...register("password")}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
