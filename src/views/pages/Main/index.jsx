import React from 'react';
import { Layout, theme } from 'antd';
import { Content, Footer, Header, Sider } from '~/views/layouts';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Driver from './Driver';

function Main({}) {
  const {
    token
  } = theme.useToken();

  console.log(token);

  return (
    <Layout className="vh-100">
      <Sider style={{ background: token.colorBgContainer }} />
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/driver" element={<Driver />} />
        {/* <Route path="/kpi" element={<Kpi {...auth} />} /> */}
      </Routes>
    </Layout>
  );
}

export default Main;
