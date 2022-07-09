import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

export const LoginDialog = () => {
  const { isLoginDialogOpen, setIsLoginDialogOpen, login } = useAuth();
  console.log(isLoginDialogOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(email, password);
  };

  const handleClose = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <Dialog open={isLoginDialogOpen} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
