import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import { Topbar } from "./components/Topbar";
import { Home } from "./pages";
import { AuthProvider } from "./providers/AuthProvider";

import "./index.css";
import { LoginDialog } from "./components/LoginDialog";

function App() {
  return (
    <AuthProvider>
      <Topbar />
      <LoginDialog />
      <Container>
        <Home />
      </Container>
    </AuthProvider>
  );
}

export default App;
