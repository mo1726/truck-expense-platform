import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeWrapper from "./ThemeContext";
import { SnackbarProvider } from "notistack";
import "@fontsource/inter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeWrapper>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeWrapper>
  </React.StrictMode>
);
