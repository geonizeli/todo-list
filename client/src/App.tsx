import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { LoginDialog } from "./components/LoginDialog";
import { Topbar } from "./components/Topbar";
import { UnautorizedBlock } from "./components/UnautorizedBlock";
import "./index.css";
import { NewAccount, Projects } from "./pages";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Topbar />
        <LoginDialog />
        <Container>
          <Box marginTop={3}>
            <UnautorizedBlock
              protectedContent={<Projects />}
              unauthenticatedContent={<NewAccount />}
            />
          </Box>
        </Container>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
