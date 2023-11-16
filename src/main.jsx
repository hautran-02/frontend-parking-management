import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./shared/GlobalStyle.js";
import { AppProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import CustomAntdTheme from "./shared/CustomAntdTheme.js";
import { ConfigProvider } from "antd";
import vi_VN from 'antd/locale/vi_VN';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <ConfigProvider locale={vi_VN}>
          <CustomAntdTheme />
          <GlobalStyle />
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
