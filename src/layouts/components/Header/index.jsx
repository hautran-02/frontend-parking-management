import { Layout } from "antd";
import React from "react";

function Header({}) {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>Header</div>
    </Layout.Header>
  );
}

export default Header;
