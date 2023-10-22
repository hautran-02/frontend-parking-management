import { useContext, useState } from "react";
import Authen from "./pages/Authen";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import AppContext from "./context";
import { ConfigProvider } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

function Auth({ children }) {
  const { state } = useContext(AppContext);
  const { auth } = state;
  if (auth.isLogin) {
    return children;
  }

  return <Navigate to={"/auth/login"} />;
}

function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/auth/login" element={<Authen />} />
        <Route
          path="/*"
          element={
            <Auth>
              <Main />
            </Auth>
          }
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
