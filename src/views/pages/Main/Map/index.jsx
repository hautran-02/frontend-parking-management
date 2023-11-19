import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Layout, Flex, Radio, theme } from 'antd';
import { Content, Footer, Header } from '~/views/layouts';
import { lazyRetry } from '~/utils';
import { MapContainer } from './components';
import { TransformBlock } from './style';
import { MapInteractionCSS } from 'react-map-interaction';
import { useSearchParams } from 'react-router-dom';

function Map({}) {
  const { token } = theme.useToken();
  const { colorBgContainer } = token;
  let [searchParams, setSearchParams] = useSearchParams();
  const zone = searchParams.get('zone') || 'A';

  const onChangeZone = (e) => {
    setSearchParams({ zone: e.target.value });
  };

  return (
    <Layout className="px-4">
      <Header className="border-1" title={'Bản đồ'} />
      <Content className="w-100 py-3">
        <Flex>
          <Radio.Group defaultValue={zone} buttonStyle="solid" onChange={onChangeZone}>
            <Radio.Button value="A">Khu A</Radio.Button>
            <Radio.Button value="B">Khu B</Radio.Button>
            <Radio.Button value="C">Khu C</Radio.Button>
          </Radio.Group>
        </Flex>
        <TransformBlock className="mt-2">
          <MapInteractionCSS>
            <MapContainer zone={zone} preview={false} />
          </MapInteractionCSS>
        </TransformBlock>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Map;
