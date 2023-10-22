import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Image, Input, Row, Space, theme } from "antd";
import { FormLayout } from "~/layouts";
import LOGO from "~/assets/logo/full-logo.svg";
import AppContext from "~/context";
import { useNavigate } from "react-router-dom";

function Authen({}) {
  const { state, actions } = useContext(AppContext);
  const { auth } = state;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onComplete = (type = "error", content) => {
    console.log(type, content);
    if (content) {
      actions.onMess({ type, content });
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    const { username, password } = values;
    setLoading(true);
    actions.onLogin({ username, password, onComplete });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if(auth.isLogin) {
      navigate("/");
    }
  }, [auth]);

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
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
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
