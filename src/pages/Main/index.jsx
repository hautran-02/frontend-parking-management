import React from "react";
import { Layout, theme } from "antd";
import { Content, Footer, Header, Sider } from "~/layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Map from "../Map";

function Main({}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(theme);
  return (
    <Layout className="vh-100">
      <Header />
      <Layout>
        <Sider style={{ background: colorBgContainer }} />
        <Layout>
          <Content className="w-100 px-4 py-2">
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/map" element={<Map />} />
              {/* <Route path="/kpi" element={<Kpi {...auth} />} /> */}
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Main;
