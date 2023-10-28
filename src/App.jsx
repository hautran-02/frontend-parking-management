import { useContext, useEffect, useState } from 'react';
import Authen from './pages/Authen';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import AppContext from './context';
import { ConfigProvider, message } from 'antd';
import customAntdTheme from './shared/CustomAntdTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';
import { dayjsSetup } from './config';
import dayjs from 'dayjs';

function Auth({ children }) {
  const { state } = useContext(AppContext);
  const { auth } = state;
  if (auth.isLogin) {
    return children;
  }

  return <Navigate to={'/auth/login'} />;
}

function App() {
  //Message Function
  const { state } = useContext(AppContext);
  const { mess } = state;
  const [messageApi, contextHolder] = message.useMessage();

  dayjsSetup();

  useEffect(() => {
    if (mess) {
      const { type, content } = mess;
      messageApi.open({
        type,
        content
      });
    }
  }, [mess]);

  console.log(dayjs().format("L"));

  return (
    <div className="app">
      {contextHolder}
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
    </div>
  );
}

export default App;
