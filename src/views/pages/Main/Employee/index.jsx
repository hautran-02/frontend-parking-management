import React, { useEffect, useMemo, useState } from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import {
  Badge,
  Card,
  Col,
  Layout,
  Row,
  Table,
  Typography,
  Space,
  Button,
  Modal,
  Pagination
} from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserApi } from '~/api';
import dayjs from 'dayjs';
import { useSearchParams, useParams } from 'react-router-dom';
import { GetAllParams } from '~/services/RegularService';
import EmployeeForm from './EmployeeForm';
import CustomedTable from '~/components/Table';

function Employee({}) {
  const [data, setData] = useState({
    data: [],
    totalCount: 0,
    totalPage: 0
  });
  const { totalCount, totalPage } = data;
  const [formAction, setFormAction] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: '10',
    pageIndex: '1'
  });
  const pageIndex = Number(searchParams.get('pageIndex'));
  const pageSize = Number(searchParams.get('pageSize'));
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    try {
      setLoading(true);
      console.log('pageSize', pageSize, pageIndex);
      const api = await UserApi.get({ ...searchParams, pageSize, pageIndex });
      console.log('api', api);
      setData(api);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [searchParams.toString()]);

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
    setOpenForm(false);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      render: (_, prop, index) => (pageIndex - 1) * pageSize + index + 1
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
          classNme="box">
          <Table
            columns={columns}
            dataSource={data.data || []}
            rowKey={(record) => record._id}
            pagination={false}
            loading={loading}
          />
          <Row className="mt-4 w-100" justify={'end'}>
            {data.totalCount ? (
              <Pagination
                total={totalCount}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={pageSize}
                current={pageIndex}
                loading={loading}
                pageSizeOptions={[10, 20, 30]}
                onChange={(page, pageSize) => {
                  setSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    pageIndex: page,
                    pageSize
                  });
                }}
              />
            ) : null}
          </Row>
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Employee;
