import { Layout, Slider } from "antd";
import HeaderContent from "../../components/HeaderContent";
import { Outlet } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#fff",
  border: "1px solid rgb(218, 220, 224)",
  marginBottom: 12,
};
const contentStyle = {
  padding: "50px",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
const footerStyle = {
  textAlign: "center",
  backgroundColor: "#fff",
};

function DefaultLayout() {
  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <HeaderContent />
        </Header>
        <Layout>
          {/* <Sider style={siderStyle}>Sider</Sider> */}
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Layout>
        <Footer style={footerStyle}>Copyright by @dtienanh1909</Footer>
      </Layout>
    </>
  );
}

export default DefaultLayout;
