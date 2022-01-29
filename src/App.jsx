import Auth from "./components/Account";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./style.css";
import Main from "components/Main";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const systemDefault = prefersDarkMode ? "dark" : "light";
  const [mode, setMode] = useState(systemDefault);

  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "8px 8px 20px 0px rgba(0,0,0,0.1)",
                borderRadius: 5,
              },
            },
          },
        },
        palette: {
          mode,
          primary: {
            main: "#ffff00",
            dark: "#10294c",
          },
          secondary: {
            main: "#ffb400",
          },
        },
      }),
    [mode]
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Auth />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { App, ColorModeContext };
