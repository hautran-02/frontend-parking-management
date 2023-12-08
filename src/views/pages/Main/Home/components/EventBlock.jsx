import { Divider, Skeleton, Typography, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import EventCard from './EventCard';
import { MonitorApi } from '~/api';
import { ErrorService } from '~/services';
import AppContext from '~/context';
import { useContext } from 'react';

function EventBlock({}) {
  const { state, actions } = useContext(AppContext);
  const [data, setData] = useState([]);
  const { token } = theme.useToken();
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(1);
  const isMounted = useRef(false);
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

  const callApi = async () => {
    try {
      const api = await MonitorApi.getEvents({ pageSize, pageIndex });
      setData(api.data);
    } catch (error) {
      ErrorService.hanldeError(error);
    } finally {
    }
  };

  useEffect(() => {
    callApi();
  }, [state.parkingEvent]);

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
          // loader={
          //   <Skeleton
          //     avatar
          //     paragraph={{
          //       rows: 1
          //     }}
          //     active
          //   />
          // }
          endMessage={<Divider plain>Không còn sự kiện khác</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            dataSource={data}
            split={false}
            renderItem={(item, index) => {
              const color = item.type === 'in' ? inColor : outColor;
              return (
                <List.Item key={item.email}>
                  <EventCard item={item} />
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
