import { TileLayout } from "@progress/kendo-react-layout";
import { Col, Layout, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "~/components";
import { Content, Footer, Header } from "~/layouts";
import { DefaultPosition } from "./data";
import { GeneralCard } from "./components";

const dynamicBlock = {
  resizable: false,
  reorderable: false,
  className: "hide-header",
};

function Home({}) {
  const [layoutItems, setLayoutItems] = useState([]);
  const tileLayoutRef = useRef(null);

  const hanldeLayout = () => {
    const rs = [
      {
        body: <GeneralCard />,
        ...dynamicBlock,
      },
      {
        body: <GeneralCard />,
        ...dynamicBlock,
      },
      {
        body: <GeneralCard />,
        ...dynamicBlock,
      },
    ];

    setLayoutItems(rs);
  };

  useEffect(() => {
    hanldeLayout();
  }, []);

  return (
    <Layout className="px-4">
      <Header className="border-1" title={"Dashboard"} />
      <Content className="w-100 py-3">
        <Row id="dashboard-block" gutter={16}>
          <Col className="gutter-row" span={16}>
            <TileLayout
              ref={tileLayoutRef}
              columns={12}
              rowHeight={4}
              gap={{ rows: 16, columns: 16 }}
              id={"dashboardLayout"}
              positions={DefaultPosition}
              items={layoutItems}
              style={{
                padding: 0,
                width: "100%",
              }}
            />
          </Col>
          <Col className="gutter-row" span={8}>
            Col2
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Home;
