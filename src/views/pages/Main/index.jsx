import React from 'react';
import { Layout, theme } from 'antd';
import { Content, Footer, Header, Sider } from '~/views/layouts';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Driver from './Driver';
import { publicRoutes } from '~/routes';
import { users } from './data';

function Main({}) {
  const { token } = theme.useToken();
  return (
    <Layout className="vh-100">
      <Sider style={{ background: token.colorBgContainer }} />
      <Routes>
        {publicRoutes.map((route, ix) => (
          <Route {...route} key={'route' + ix} />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
}

export default Main;
