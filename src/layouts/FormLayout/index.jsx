import React from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

function FormLayout({ children }) {
  return (
    <Layout className="vh-100">
      <Content className="d-flex justify-content-center align-items-center w-100">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
}

export default FormLayout;
