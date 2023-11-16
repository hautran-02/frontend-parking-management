import React, { useEffect, useRef, useState } from 'react';
import { Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';

function Map({}) {
  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Bản đồ'} />
      <Content className="w-100 py-3">
        
      </Content>
      <Footer />
    </Layout>
  );
}

export default Map;
