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
import { UnautorizedBlock } from "./components/UnautorizedBlock";
import { NewAccount } from "./pages/NewAccount/NewAccount";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Topbar />
        <LoginDialog />
        <Container>
          <UnautorizedBlock
            protectedContent={<Home />}
            unauthenticatedContent={<NewAccount />}
          />
          <Home />
        </Container>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
