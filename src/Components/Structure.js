import React from 'react';
import { Layout, Menu } from 'antd';
import { HeartOutlined, BankOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

function Structure({component}) {
    return (
        <>
            <Layout>
                <Sider>
                    <div className="logo" style={{height : "8vh"}} />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<BankOutlined />}>
                            <Link to="/all-banks">All Banks</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<HeartOutlined />}>
                            <Link to="/favourites">Favourites</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px 0', minHeight: "100vh" }}>
                        {component}
                    </Content>
                </Layout>
        </Layout>
      </>
    )
}

export default Structure;