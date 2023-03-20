import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getAllServices } from "./redux/action/service";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
