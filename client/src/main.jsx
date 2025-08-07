import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store.js";

const token = localStorage.getItem("token");
if(token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)