import React from "react";
import ReactDOM from "react-dom/client";
import mermaid from "mermaid";
import App from "./App.tsx";
import "./index.css";

mermaid.initialize({ startOnLoad: false });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
