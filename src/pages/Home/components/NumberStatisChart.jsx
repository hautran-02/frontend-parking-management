import { Column } from '@ant-design/plots';
import { Card, DatePicker, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import CardBlock from '~/components/CardBlock';
import { DefaultNumberStatisChart } from '../data';
import { ChartService } from '~/services';

function NumberStatisChart({}) {
  const [data, setData] = useState([]);
  const unit = 'xe';

  console.log(data);

  const config = {
    ...ChartService.defaultConfig,
    height: 200,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'zone',
    isGroup: true,
    legend: {
      position: 'top',
      itemName: {
        formatter: (text) => {
          return 'Khu ' + text;
        }
      }
    },
    tooltip: {
      title: (e) => {
        return  e;
      },
      customItems: (originalItems) => {
        let rs = originalItems.map((org) => {
          return {
            ...org,
            name: 'Khu ' + org.name,
            value: Number(org.value).toFixed(2) + ' ' + unit
          };
        });
        return rs;
      }
    }
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
          <DatePicker.RangePicker />
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
