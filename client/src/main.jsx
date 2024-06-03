import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Router>
      <App />
    </Router>
  </ChakraProvider>
);
