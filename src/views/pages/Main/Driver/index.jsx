import React, { useEffect, useState } from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { Badge, Card, Col, Layout, Row, Table, Typography, Space, Button } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MonitorApi } from '~/api';
import dayjs from 'dayjs';
import { DriverForm } from './components';

function Driver({}) {
  const [data, setData] = useState([]);
  const [formAction, setFormAction] = useState({});
  const [openForm, setOpenForm] = useState(false);

  const callApi = async () => {
    const api = await MonitorApi.getAllDriver();
    setData(api);
  };

  useEffect(() => {
    callApi();
  }, []);

  const expandedRowRender = (subData) => {
    const columns = [
      {
        title: 'Biển số xe',
        dataIndex: 'licenePlate',
        key: 'licenePlate'
      },
      {
        title: 'Loại xe',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Trạng thái',
        key: 'status',
        render: (_, record) => {
          let config = {
            status: 'success',
            text: 'Còn hoạt động'
          };
          if (record._destroy) {
            config = {
              status: 'error',
              text: 'Dừng hoạt động'
            };
          }
          return <Badge {...config} />;
        }
      },
      {
        title: 'Ngày đăng ký',
        dataIndex: 'createdAt',
        key: 'createdAt'
      }
    ];
    const newData = subData?.vehicle || [];
    return (
      <div className="container-fluid">
        <Typography.Title type="primary" level={5}>
          Danh sách xe:
        </Typography.Title>
        <Table columns={columns} dataSource={newData} pagination={false} />
      </div>
    );
  };

  const onAdd = () => {
    setFormAction({ action: 'add', actionText: 'Thêm', title: 'Thêm chủ xe mới' });
    setOpenForm(true);
  };

  const onEdit = (values) => {
    setFormAction({
      action: 'edit',
      actionText: 'Chỉnh sửa',
      title: 'Chỉnh sửa thông tin chủ xe',
      payload: { ...values }
    });
    setOpenForm(true);
  };

  const onDelete = (values) => {
    //hanlde Delete
  };

  const hanldeCloseForm = () => {
    setOpenForm(false);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      render: (_, prop, index) => index
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'adress',
      key: 'address'
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record, index) => dayjs(record.createdAt).format('L')
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record, index) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => {
              onEdit(record);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="text"
            onClick={() => {
              onDelete(record);
            }}
          />
        </Space>
      )
    }
  ];
  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Quản lý chủ xe'} />
      <Content className="w-100 py-3">
        <DriverForm formAction={formAction} isOpen={openForm} onClose={hanldeCloseForm} />
        <Card
          title={
            <Typography.Title type="primary" level={4}>
              Danh sách:
            </Typography.Title>
          }
          extra={
            <Space>
              <Button type="primary" ghost icon={<PlusOutlined />} onClick={onAdd}>
                Thêm chủ xe
              </Button>
            </Space>
          }
          className="box">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ['0']
            }}
            dataSource={data}
            rowKey={(record) => record._id}
          />
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Driver;
