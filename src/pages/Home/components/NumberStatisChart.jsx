import { Card, DatePicker, Space, Typography } from "antd";
import React from "react";
import CardBlock from "~/components/CardBlock";

function NumberStatisChart({}) {
  return (
    <Card
      title={
        <Typography.Title level={4}>
          Biểu đồ thống kê số lượng xe
        </Typography.Title>
      }
      extra={
        <Space>
          <Typography.Text>Chọn khoảng thời gian</Typography.Text>
          <DatePicker.RangePicker size="small" showTime />
        </Space>
      }
      className="card-main"
    >
      <CardBlock>
        <div className="py-4"></div>
      </CardBlock>
    </Card>
  );
}

export default NumberStatisChart;
