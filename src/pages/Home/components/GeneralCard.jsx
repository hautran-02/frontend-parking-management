import { Gauge } from "@ant-design/plots";
import { Card, Space, theme } from "antd";
import React from "react";
import CardBlock from "~/components/CardBlock";

function GeneralCard({}) {
  const { token } = theme.useToken();

  console.log(token);

  const config = {
    height: 140,
    percent: 0.75,
    range: {
      color: "l(0) 0:#B8E1FF 1:#3D76DD",
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    innerRadius: 0.8,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: "36px",
          color: "#4B535E",
        },
        formatter: () => "70%",
      },
      content: {
        style: {
          fontSize: "24px",
          lineHeight: "44px",
          color: "#4B535E",
        },
        formatter: () => "加载进度",
      },
    },
    gaugeStyle: {
      lineCap: "round",
      lineDash: [4, 5],
      strokeOpacity: 0.7,
      shadowColor: token.boxShadowCard,
      shadowBlur: 1,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
    },
  };
  return (
    <Card title={"Khu A"} className="card-main">
      <CardBlock>
        <div className="py-4">
          <Gauge {...config} />
        </div>
      </CardBlock>
    </Card>
  );
}

export default GeneralCard;
