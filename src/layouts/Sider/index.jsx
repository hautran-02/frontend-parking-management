import { CarOutlined, LineChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

const MENU_ITEMS = [
    {
      key: "home",
      label: "Dashboard",
      icon: <LineChartOutlined />,
    },
    {
      key: "map",
      label: "Bản đồ",
      icon: <CarOutlined />,
    },
  ];

function Sider({...props}) {
  return (
    <Layout.Sider {...props} width={200}>
      <Menu
        defaultSelectedKeys={["home"]}
        items={MENU_ITEMS}
      />
    </Layout.Sider>
  );
}

export default Sider;
