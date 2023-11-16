import React, { useContext, useEffect } from 'react';
import { Avatar, Button, Dropdown, Flex, Image, Layout, Space, Typography, theme } from 'antd';
import FULL_LOGO from '~/assets/logo/logo-text.svg';
import DEFAULT_AVATAR from '~/assets/images/avatar.png';
import { DownOutlined, SettingTwoTone } from '@ant-design/icons';
import AppContext from '~/context';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Chỉnh sửa thông tin',
    key: 'editProfile',
    disabled: true
  },
  {
    label: <Typography.Text type="danger">Đăng xuất</Typography.Text>,
    key: 'logout'
  }
];

function Header({ title }) {
  const {
    token: { colorBgContainer, colorPrimary }
  } = theme.useToken();
  const { state, actions } = useContext(AppContext);
  const { auth } = state;
  const navigate = useNavigate();

  const hanldeLogout = async () => {
    actions.logout();
    navigate('/auth/login');
  };

  const hanldeClickProfile = ({ key }) => {
    if (key === 'logout') {
      hanldeLogout();
    }
  };

  useEffect(() => {
    if (!state.auth.isLogin) {
      navigate('/auth/login');
    }
  }, [state.auth]);

  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: colorBgContainer,
        height: 60,
        boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.16)'
      }}
      className="px-4 py-2 border-1">
      <Flex justify="space-between" className="w-100">
        <Typography.Title level={4} style={{ margin: 'auto 0', color: colorPrimary }}>
          {title}
        </Typography.Title>
        <Space>
          <Space id="profileUser">
            <Avatar src={DEFAULT_AVATAR} size={40} />
            <Dropdown
              menu={{ items, onClick: hanldeClickProfile }}
              trigger={['click']}
              placement="bottomRight">
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
