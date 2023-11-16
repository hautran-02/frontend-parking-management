import { Column } from '@ant-design/plots';
import { Card, DatePicker, Space, Typography, theme } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import CardBlock from '~/components/CardBlock';
import { DefaultNumberStatisChart } from '../data';
import { ChartService } from '~/services';
import dayjs from 'dayjs';
import AppContext from '~/context';
import { MonitorApi } from '~/api';
import { CustomedDateRangePicker } from '~/components';

const zones = ['A', 'B', 'C'];

function NumberStatisChart({}) {
  const { state, actions } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([dayjs().startOf('week'), dayjs().endOf('week')]);
  const defaultConfig = ChartService.defaultConfig;
  const { token } = theme.useToken();
  const color = [token['purple'], token['magenta'], token['orange2']];
  const unit = {
    x: 'Ngày',
    y: 'Xe'
  };

  const config = {
    ...defaultConfig,
    height: 200,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'zone',
    isGroup: true,
    yAxis: {
      title: {
        text: unit.y,
        style: ChartService.textStyle
      }
    },
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
            value: org.data.isData ? `${org.value} ${unit.y}` : 'Không xác định'
          };
        });
        return rs;
      }
    }
  };

  const onChangeDate = (dates, dateStrings) => {
    setDates(dates);
  };

  const callApi = async () => {
    try {
      let [startDate, endDate] = dates;
      const dateArr = ChartService.generateRange(startDate, endDate, 'd', 'L');
      startDate = startDate.format('L');
      endDate = endDate.format('L');
      const api = await MonitorApi.getVehicleInOutNumber({ startDate, endDate });
      const result = api;
      //hanlde Data

      const newData = [];
      const defaultValue = 0;
      dateArr.map((date) => {
        let value = null;
        const [el] = result.slice(0, 1);

        if (el && el.date === date) {
          result.shift();
          zones.map((zone) => {
            value = el.data[zone] || null;

            newData.push({
              date,
              value,
              zone,
              isData: true
            });
          });
        } else {
          zones.map((zone) => {
            value = defaultValue;
            newData.push({
              date,
              value,
              zone,
              isData: false
            });
          });
        }
      });

      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, [dates]);

  return (
    <Card
      title={<Typography.Title level={4}>Biểu đồ thống kê số lượng xe</Typography.Title>}
      extra={
        <Space>
          <Typography.Text>Thời gian:</Typography.Text>
          <CustomedDateRangePicker
            defaultValue={dates}
            onChange={onChangeDate}
            format={'L'}
            bordered={false}
            allowClear={false}
            suffixIcon={false}
            style={{ width: 220 }}
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