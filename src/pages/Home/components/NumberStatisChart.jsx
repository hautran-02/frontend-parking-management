import { Card, Typography } from "antd";
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
      className="card-main"
    >
      <CardBlock>
        <div className="py-4">
            
        </div>
      </CardBlock>
    </Card>
  );
}

export default NumberStatisChart;
