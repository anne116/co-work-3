// import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import HomeDown from "./HomeDown.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <HomeDown />
  </ChakraProvider>
  // </React.StrictMode>
);
