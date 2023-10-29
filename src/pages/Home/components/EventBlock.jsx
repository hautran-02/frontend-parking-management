import { Card, Col, Collapse, Image, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List } from 'antd';
import { DefaultEvents } from '../data';
import IMG_LISENCE from '~/assets/images/lisence.png';
const { Meta } = Card;

function EventBlock({}) {
  const [data, setData] = useState([]);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  useEffect(() => {
    setData(DefaultEvents);
  }, []);

  console.log(data);
  return (
    <div>
      <Typography.Title level={4}>Sự kiện</Typography.Title>
      <List>
        <VirtualList data={data} height={720} itemKey="email" onScroll={onScroll}>
          {(item, index) => (
            <List.Item key={'Event' + index}>
              <Card title={item.time.format('L LTS')} className="w-100">
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                  <Col span={8}>
                    <Image src={IMG_LISENCE}/>
                  </Col>
                  <Col span={16}>Col 2</Col>
                </Row>
              </Card>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
}

export default EventBlock;
