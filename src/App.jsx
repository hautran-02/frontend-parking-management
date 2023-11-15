import { useContext, useEffect, useState } from 'react';
import Authen from './views/pages/Authen';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Main from './views/pages/Main';
import AppContext from './context';
import { ConfigProvider, message } from 'antd';
import customAntdTheme from './shared/CustomAntdTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';
import { dayjsSetup } from './config';
import dayjs from 'dayjs';
import PageError from './views/pages/PageError';

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
  const navigate = useNavigate();

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
          errorElement={
            <PageError
              status="500"
              title={false}
              subTitle="Không tìm thấy trang"
              btn={{ text: 'Về trang chủ', onClick: () => <Navigate to={'/dashboard'} /> }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
