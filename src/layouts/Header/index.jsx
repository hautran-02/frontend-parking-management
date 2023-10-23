import { Image, Layout, Space, theme } from "antd";
import React from "react";
import FULL_LOGO from "~/assets/logo/logo-text.svg";

function Header({}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
        height: 64,
        boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.16)",
      }}
      className="px-4 py-2"
    >
      <Space>
        <Image src={FULL_LOGO} preview={false} width={280}/>
      </Space>
    </Layout.Header>
  );
}

export default Header;
