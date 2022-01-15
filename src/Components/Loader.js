import React, { useEffect } from 'react';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 60, color: "#00D09B" }} spin/>;

export const Loader = () => {

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return()=>{
            document.body.style.overflow = "scroll";
        }
    }, []);

    return (
        <div style={{
            height: '100%',
            width: '100%',
            backgroundColor: "rgba(255,255,255,0.8)",
            marginLeft: "-250px",
            position: "absolute",
            zIndex: '999',
            top: '0px',
            overflow: 'hidden'
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height : '100vh'
            }}>
                <Space size="middle">
                    <Spin size="large" indicator={antIcon}/>
                </Space>
            </div>
        </div>
    )
}

export default Loader;