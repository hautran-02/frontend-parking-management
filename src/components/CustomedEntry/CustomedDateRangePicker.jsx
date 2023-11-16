import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

function CustomedDateRangePicker({ limit = [14, 'd'], ...restProps }) {
  const { value } = restProps;
  const [disabledDate, setDisabledDate] = useState(false);

  const onCalendarChange = (values, _, info) => {
    const [start, end] = values;
    const { range } = info;

    console.log('onCalendarChange', values, range);
    if (range === 'start') {
      const newDisable = (current) => {
        return current && current > (start.add(14, "d") || curr > dayjs());
      };
      console.log('rs', newDisable);
      setDisabledDate(newDisable);
    } else {
    }
  };


  return (
    <DatePicker.RangePicker
      {...restProps}
      onCalendarChange={onCalendarChange}
      disabledDate={disabledDate}
      presets={[
        {
          label: '7 ngày gần nhất',
          value: [dayjs().add(-7, 'd'), dayjs()]
        },
        {
          label: '14 ngày gần nhất',
          value: [dayjs().add(-14, 'd'), dayjs()]
        },
        {
          label: '21 ngày gần nhất',
          value: [dayjs().add(-21, 'd'), dayjs()]
        },
        {
          label: '1 tháng gần nhất',
          value: [dayjs().add(-1, 'M'), dayjs()]
        }
      ]}
    />
  );
}

export default CustomedDateRangePicker;