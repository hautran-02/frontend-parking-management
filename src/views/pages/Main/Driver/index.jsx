import React, { useContext, useEffect, useState } from 'react';
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
  Input,
  Modal,
  Pagination
} from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserApi } from '~/api';
import dayjs from 'dayjs';
import DriverForm from './DriverForm';
import { useSearchParams } from 'react-router-dom';
import AppContext from '~/context';
import { ErrorService } from '~/services';

function Driver({}) {
  const [data, setData] = useState({
    data: [],
    totalCount: 0,
    totalPage: 0
  });
  const { totalCount, totalPage } = data;
  const [formAction, setFormAction] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const { actions } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: '10',
    pageIndex: '1'
  });
  const pageIndex = Number(searchParams.get('pageIndex'));
  const pageSize = Number(searchParams.get('pageSize'));
  const params = { pageSize, pageIndex };
  for (let [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');
  const email = searchParams.get('email');
  const licenePlate = searchParams.get('licenePlate');
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    try {
      setLoading(true);
      const api = await UserApi.getDrivers({ ...params, pageSize, pageIndex });
      setData(api);
    } catch (error) {
      ErrorService.hanldeError(error, actions.onNoti);
      setData({ data: [], pageSize: 0, pageIndex: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [searchParams.toString()]);

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
    const newData = subData?.driver?.vehicle || [];
    console.log(subData);

    return (
      <div className="container-fluid">
        <Typography.Title type="primary" level={5}>
          Danh sách xe:
        </Typography.Title>
        <Table
          columns={columns}
          dataSource={newData}
          pagination={false}
          rowKey={(record) => record._id}
        />
      </div>
    );
  };

  const onAdd = () => {
    setFormAction({ action: 'add', actionText: 'Thêm', title: 'Thêm chủ xe mới' });
    setOpenForm(true);
  };

  const onEdit = (values) => {
    console.log(values);
    values.licenePlate = values.driver?.vehicle[0]?.licenePlate || null;
    setFormAction({
      action: 'edit',
      actionText: 'Chỉnh sửa',
      title: 'Chỉnh sửa thông tin chủ xe',
      payload: { ...values }
    });
    setOpenForm(true);
  };

  const onDelete = async (values) => {
    try {
      actions.onMess({
        content: 'Đang xóa',
        type: 'loading',
        duration: 1,
      });
      const api = await UserApi.deleteDriver(values._id);
      setData(api);
      actions.onMess({
        content: 'Xóa thành công',
        type: 'success'
      });
      callApi();
    } catch (error) {
      ErrorService.hanldeError(error, actions.onNoti);
    } finally {
    }
  };

  const hanldeCloseForm = ({ reload }) => {
    setOpenForm(false);
    if (reload) callApi();
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      width: 60,
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
      dataIndex: 'adress',
      key: 'address'
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (_, record, index) => dayjs(record.createdAt).format('L')
    },
    {
      title: '',
      dataIndex: 'actions',
      width: 120,
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

  const onEnterFilter = (e) => {
    const { value, name } = e.target;
    if (value) {
      setSearchParams({ ...params, [name]: value.toString().trim() });
    }
  };

  const onChangeFilter = (e) => {
    const { value, name } = e.target;
    if (!value) {
      delete params[name];
      setSearchParams({ ...params });
    }
  };

  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Quản lý chủ xe'} />
      <Content className="w-100 py-3">
        <Modal
          title={formAction.title}
          open={openForm}
          onCancel={() => {
            setOpenForm(false);
          }}
          destroyOnClose={true}
          classNames={{ footer: 'd-none' }}>
          <DriverForm
            formAction={formAction}
            isOpen={openForm}
            onClose={hanldeCloseForm}
            onNoti={actions.onNoti}
            onMess={actions.onMess}
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
                Thêm chủ xe
              </Button>
            </Space>
          }
          className="box">
          <Row className="mt-2 mb-4 w-100">
            <Row>
              <Space>
                <Typography.Title level={5} className="mb-0">
                  Bộ lọc:
                </Typography.Title>
                <Input
                  style={{
                    width: 200
                  }}
                  placeholder="Tên"
                  name="name"
                  defaultValue={name}
                  onPressEnter={onEnterFilter}
                  onChange={onChangeFilter}
                  allowClear={true}
                />
                <Input
                  style={{
                    width: 200
                  }}
                  placeholder="Số điện thoại"
                  name="phone"
                  defaultValue={phone}
                  onPressEnter={onEnterFilter}
                  onChange={onChangeFilter}
                  allowClear={true}
                />
                <Input
                  style={{
                    width: 320
                  }}
                  name="email"
                  placeholder="Email"
                  defaultValue={email}
                  onPressEnter={onEnterFilter}
                  onChange={onChangeFilter}
                  allowClear={true}
                />
                <Input
                  style={{
                    width: 200
                  }}
                  name="licenePlate"
                  placeholder="Biển số xe"
                  defaultValue={licenePlate}
                  onPressEnter={onEnterFilter}
                  onChange={onChangeFilter}
                  allowClear={true}
                />
              </Space>
            </Row>
          </Row>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ['0']
            }}
            loading={loading}
            pagination={false}
            dataSource={data.data || []}
            rowKey={(record) => record._id}
            scroll={{ y: 600, scrollToFirstRowOnChange: true }}
          />
          <Row className="mt-4 w-100" justify={'end'}>
            {data.totalCount ? (
              <Pagination
                total={totalCount}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={pageSize}
                current={pageIndex}
                disabled={loading}
                showSizeChanger={true}
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

export default Driver;
