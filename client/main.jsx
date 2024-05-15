import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./index.css";

// Create a Material-UI theme with Open Sans font
const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);