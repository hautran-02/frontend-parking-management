import React, { useEffect, useState } from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { Badge, Card, Col, Layout, Row, Table, Typography } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { MonitorApi } from '~/api';
import dayjs from 'dayjs';

function Driver({}) {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const api = await MonitorApi.getAllDriver();
    setData(api);
    console.log('api', api);
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
    }
  ];
  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Quản lý chủ xe'} />
      <Content className="w-100 py-3">
        <Card className="box">
          <Typography.Title type="primary" level={4}>
            Danh sách:
          </Typography.Title>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ['0']
            }}
            dataSource={data}
          />
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Driver;
