import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Space,
  Typography,
  theme,
} from "antd";
import React from "react";
import FULL_LOGO from "~/assets/logo/logo-text.svg";
import DEFAULT_AVATAR from "~/assets/images/avatar.png";
import { DownOutlined, SettingTwoTone } from "@ant-design/icons";
import { avatarItem } from "./data";

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
        height: 60,
        boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.16)",
      }}
      className="px-4 py-2"
    >
      <Flex justify="space-between" className="w-100">
        <Image id="logo" src={FULL_LOGO} preview={false} width={240} />
        <Space>
          <Space id="profileUser">
            <Avatar src={DEFAULT_AVATAR} size={40} />
            <Dropdown menu={{ items: avatarItem }} trigger={["click"]} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Trần Trung Hậu
                  </Typography.Title>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Space>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
