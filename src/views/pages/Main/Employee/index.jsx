import React, { useEffect, useState } from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { Badge, Card, Col, Layout, Row, Table, Typography, Space, Button, Modal } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserApi } from '~/api';
import dayjs from 'dayjs';
import { useSearchParams, useParams } from 'react-router-dom';
import { GetAllParams } from '~/services/RegularService';
import EmployeeForm from './EmployeeForm';

function Employee({}) {
  const [data, setData] = useState([]);
  const [formAction, setFormAction] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const { pageSize, pageIndex, name, address, phone, email, username } = searchParams;
  const params = GetAllParams(searchParams);
  const { pageSize, pageIndex } = params;
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    const api = await UserApi.getEmployee({ ...params });
    setData(api.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const onAdd = () => {
    setFormAction({ action: 'add', actionText: 'Thêm', title: 'Thêm nhân viên mới' });
    setOpenForm(true);
  };

  const onEdit = (values) => {
    values.user = values.user.username;
    setFormAction({
      action: 'edit',
      actionText: 'Chỉnh sửa',
      title: 'Chỉnh sửa thông tin nhân viên',
      payload: { ...values }
    });
    setOpenForm(true);
  };

  const onDelete = (values) => {
    //hanlde Delete
  };

  const hanldeCloseForm = () => {
    setOpenForm(false)
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      render: (_, prop, index) => index + 1
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
      dataIndex: 'address',
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
      <Header className="border-1" title={'Quản lý nhân viên'} />
      <Content className="w-100 py-3">
        <Modal
          title={formAction.title}
          open={openForm}
          onCancel={() => {
            setOpenForm(false);
          }}
          destroyOnClose={true}
          classNames={{ footer: 'd-none' }}>
          <EmployeeForm
            formAction={formAction}
            onClose={hanldeCloseForm}
            noChangeAccount={formAction.action === 'edit'}
          />
        </Modal>
        <Card
          title={
            <Typography.Title type="primary" level={4}>
              Danh sách:
            </Typography.Title>
          }
          extra={
            <Space>
              <Button type="primary" ghost icon={<PlusOutlined />} onClick={onAdd}>
                Thêm nhân viên
              </Button>
            </Space>
          }
          className="box">
          <Table columns={columns} dataSource={data} rowKey={(record) => record._id} />
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Employee;
