import React, { useContext, useMemo } from 'react';
import { Layout, Modal, theme } from 'antd';
import { Sider } from '~/views/layouts';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { adminRoutes, publicRoutes } from '~/routes';
import AppContext from '~/context';
import { PasswordForm } from '~/views/components/Form';
import socket from '~/socket';
import { useEffect } from 'react';

function Main({}) {
  const { token } = theme.useToken();
  const { state, actions } = useContext(AppContext);
  const { auth } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const hanldeNotiParking = (event) => {
      actions.onEventParking(event);
    };
    //config websocket
    socket.on('connect', () => {
      console.log('socket successful');
    });

    socket.on('notification-parking', hanldeNotiParking);

    return () => {
      socket.off('connect', () => {
        console.log('socket close');
      });
      socket.off('notification-parking', hanldeNotiParking);
    };
  }, []);
  // addManyDriver();
  // employees();

  const currRoute = useMemo(() => {
    let rs = publicRoutes;
    if (auth.role && auth.role === 'Admin') {
      console.log(auth);
      rs = adminRoutes;
    }
    return rs;
  }, [state.auth]);

  console.log(currRoute);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Modal
        title={'Thay đổi mật khẩu'}
        open={state.onChangePassword}
        onCancel={() => {
          actions.onSetChangePassword();
        }}
        destroyOnClose={true}
        classNames={{ footer: 'd-none' }}>
        <PasswordForm
          account={state.auth?.info?.account}
          isOpen={state.onChangePassword}
          onClose={({ afterAction }) => {
            actions.onSetChangePassword();
            afterAction();
          }}
          noChangeAccount
        />
      </Modal>
      <Sider routes={currRoute} />
      <Routes>
        {currRoute.map((route, ix) => (
          <Route {...route} key={'route' + ix} />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
}

export default Main;
