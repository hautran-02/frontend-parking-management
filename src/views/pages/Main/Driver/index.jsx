import React from 'react';
import { TileLayout } from '@progress/kendo-react-layout';
import { Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';

function Driver({}) {
  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Chủ xe'} />
      <Content className="w-100 py-3"></Content>
      <Footer />
    </Layout>
  );
}

export default Driver;
