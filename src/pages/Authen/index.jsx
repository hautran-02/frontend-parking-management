import React from "react";
import { Button, Checkbox, Form, Image, Input, Row, Space, theme } from "antd";
import { FormLayout } from "~/layouts";
import LOGO from "~/assets/logo/full-logo.svg";

function Authen({}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormLayout>
      <Space direction="vertical" size="large">
        <Row justify="center">
          <Image src={LOGO} preview={false} />
        </Row>
        <Row>
          <Form
            name="loginForm"
            style={{
              width: 400,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Space>
    </FormLayout>
  );
}

export default Authen;
