import { Column } from '@ant-design/plots';
import { Card, DatePicker, Space, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import CardBlock from '~/components/CardBlock';
import { DefaultNumberStatisChart } from '../data';
import { ChartService } from '~/services';
import dayjs from 'dayjs';

function NumberStatisChart({}) {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([dayjs().startOf('week'), dayjs().endOf('week')]);
  const defaultConfig = ChartService.defaultConfig;
  const unit = 'xe';
  const { token } = theme.useToken();
  const color = [token["purple"], token["magenta"], token["orange2"]];

  const config = {
    ...defaultConfig,
    height: 200,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'zone',
    colorField: 'zone',
    color,
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
        return e;
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

  const onChangeDate = (dates, dateStrings) => {
    setDates(dates)
  };

  useEffect(() => {
    setData(DefaultNumberStatisChart());
  }, [dates]);

  return (
    <Card
      title={<Typography.Title level={4}>Biểu đồ thống kê số lượng xe</Typography.Title>}
      extra={
        <Space>
          <Typography.Text>Thời gian:</Typography.Text>
          <DatePicker.RangePicker
            onChange={onChangeDate}
            format={'DD/MM/YYYY'}
            value={dates}
            bordered={false}
            allowClear={false}
            suffixIcon={false}
            style={{width: 220}}
          />
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
