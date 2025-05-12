import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthProvider } from "./Context/authContext.js"; // AuthProvider'ı import et
import axios from 'axios';
import { NavProvider} from "./Context/navContext.js";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter >
    <AuthProvider>
      <NavProvider>
      <Layout>
        <App />
      </Layout>
      </NavProvider>
    </AuthProvider>
  </HashRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
