import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false
});

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
