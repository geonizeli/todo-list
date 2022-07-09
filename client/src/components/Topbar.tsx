import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

export const Topbar = () => {
  const { authenticated, logout, setIsLoginDialogOpen } = useAuth();

  const handleLogoutButtonClick = () => {
    if (logout) {
      logout();
    }
  };

  const handleLoginButtonClick = () => {
    setIsLoginDialogOpen(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODO Lists
        </Typography>
        {authenticated ? (
          <Button onClick={handleLogoutButtonClick} color="inherit">
            Logout
          </Button>
        ) : (
          <Button onClick={handleLoginButtonClick} color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
