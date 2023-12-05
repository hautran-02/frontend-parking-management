import {
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Image,
  Row,
  Skeleton,
  Space,
  Typography,
  theme
} from 'antd';
import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List } from 'antd';
import { DefaultEvents } from '../data';
import IMG_LISENCE from '~/assets/images/lisence.png';
import CustomedTag from '~/components/CustomedTag';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Meta } = Card;

function EventBlock({}) {
  const [data, setData] = useState([]);
  const { token } = theme.useToken();
  const { geekblue6, blue2, colorTextSecondary, colorText, gold2, gold7 } = token;
  const inColor = {
    primary: geekblue6,
    secondary: blue2
  };
  const outColor = {
    primary: gold7,
    secondary: gold2
  };
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 400) {
      appendData();
    }
  };

  useEffect(() => {
    //callApi()
    setData(DefaultEvents);
  }, []);

  return (
    <div>
      <Typography.Title level={4}>Sự kiện</Typography.Title>
      <div
        id="scrollableDiv"
        style={{
          height: 800,
          overflow: 'auto'
        }}>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1
              }}
              active
            />
          }
          endMessage={<Divider plain>Không còn sự kiện khác</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            dataSource={data}
            split={false}
            renderItem={(item, index) => {
              const color = item.type === 'in' ? inColor : outColor;
              return (
                <List.Item key={item.email}>
                  <Card
                    title={item.time.format('L LTS')}
                    className="event-card"
                    style={{
                      width: '99%',
                      backgroundColor: color.secondary,
                      border: `2px solid ${color.primary}`
                    }}>
                    <div id="eventTag" className="event-tag">
                      <CustomedTag entity={item.type} entityType="event">
                        {item.type === 'in' ? 'Xe vào' : 'Xe ra'}
                      </CustomedTag>
                    </div>
                    <Row gutter={{ xs: 4, sm: 8, md: 12 }}>
                      <Col span={8}>
                        <Flex vertical={true} align="center" gap={4}>
                          <Image id="eventLisenceImg" src={IMG_LISENCE} />
                          <Typography.Text id="eventLisencePlate">{item.license}</Typography.Text>
                        </Flex>
                      </Col>
                      <Col span={16}>
                        <Flex justify="space-evenly" vertical={true} align="start">
                          <Typography.Title
                            id="eventZone"
                            level={5}
                            className="mb-0"
                            style={{ color: color.primary }}>
                            {'Khu ' + item.zone}
                          </Typography.Title>
                          <Typography.Text id="eventDriverName">
                            <span className="label">Chủ xe: </span>
                            <span className="value">{item.driver.name}</span>
                          </Typography.Text>
                          <Typography.Text id="eventDriverJob">
                            <span className="label">Nghề nghiệp: </span>
                            <span className="value">{item.driver.job}</span>
                          </Typography.Text>
                          <Typography.Text id="eventDriverDepartment">
                            <span className="label">Đơn vị: </span>
                            <span className="value">{item.driver.department}</span>
                          </Typography.Text>
                          <Typography.Text id="eventDriverPhone">
                            {' '}
                            <span className="label">SĐT: </span>
                            <span className="value">{item.driver.phone}</span>
                          </Typography.Text>
                        </Flex>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              );
            }}
          />
        </InfiniteScroll>
      </div>
      {/* <List split={false}>
        <VirtualList
          data={data}
          height={720}
          onScroll={onScroll}
          rowKey={(d) => {
            console.log(d);
            return 1;
          }}>
          {(item, index) => {
            const color = item.type === 'in' ? inColor : outColor;
            return (
              <List.Item>

              </List.Item>
            );
          }}
        </VirtualList>
      </List> */}
    </div>
  );
}

export default EventBlock;
