import { Layout } from "antd";
import React from "react";
import { PageHeader } from "~/components";
import { Content, Footer, Header } from "~/layouts";

function Home({}) {
  return (
    <Layout className="px-4">
      <Header className="border-1" title={"Dashboard"}/>
      <Content className="w-100 px-4 py-3"></Content>
      <Footer />
    </Layout>
  );
}

export default Home;
