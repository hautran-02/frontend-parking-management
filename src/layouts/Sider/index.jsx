import { CarOutlined, LineChartOutlined } from "@ant-design/icons";
import { Flex, Image, Layout, Menu, Typography } from "antd";
import React from "react";
import LOGO from "~/assets/logo/main.svg";

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

function Sider({ ...props }) {
  return (
    <Layout.Sider {...props} width={200} className="py-4">
      <Flex vertical>
        <Flex vertical className="px-2" align="center">
          <Image src={LOGO} width={40} />
          <Typography.Title level={4} className="text-center">Parking Management</Typography.Title>
        </Flex>
        <Menu defaultSelectedKeys={["home"]} items={MENU_ITEMS} />
      </Flex>
    </Layout.Sider>
  );
}

export default Sider;
