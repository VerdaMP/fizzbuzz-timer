import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

// Render the App component wrapped with the Redux Provider
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* The App component can now access the Redux store */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"), // Render to the 'root' div in index.html
);
