import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import "./styles.css"
import App from "./App"
//this file triggers when index.html used
//change root to App.js component
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)