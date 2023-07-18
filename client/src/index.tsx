import React from "react";
import ReactDOM from "react-dom/client";
import "./style/main.scss";
import App from "./App";
import ApiProvider from "./context/APIContext";
import SearchService from "./service/SearchService";
import HttpClient from "./service/HttpClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpClient = new HttpClient();
const searchService = new SearchService(httpClient);

root.render(
  <ApiProvider searchService={searchService}>
    <App />
  </ApiProvider>
);
