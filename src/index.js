import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  //   {/* <Router>
  //     <App />
  //   </Router> */}
  // </React.StrictMode>

  <Provider store={store}>
    <App />
  </Provider>
);
