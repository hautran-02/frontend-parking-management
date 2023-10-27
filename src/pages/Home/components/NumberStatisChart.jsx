import { Column } from '@ant-design/plots';
import { Card, DatePicker, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import CardBlock from '~/components/CardBlock';
import { DefaultNumberStatisChart } from '../data';
import { ChartService } from '~/services';

function NumberStatisChart({}) {
  const [data, setData] = useState([]);

  console.log(data);

  const config = {
    ...ChartService.defaultConfig,
    height: 200,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'zone',
    isGroup: true,
  };

  useEffect(() => {
    setData(DefaultNumberStatisChart());
  }, []);

  return (
    <Card
      title={<Typography.Title level={4}>Biểu đồ thống kê số lượng xe</Typography.Title>}
      extra={
        <Space>
          <Typography.Text>Chọn khoảng thời gian</Typography.Text>
          <DatePicker.RangePicker size="small" />
        </Space>
      }
      className="card-main">
      <CardBlock>
        <div className="px-4">
          <Column {...config} />
        </div>
      </CardBlock>
    </Card>
  );
}

export default NumberStatisChart;
