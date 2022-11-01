import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout,Input, Space,Button,Menu,MenuItemProps  } from 'antd';
import React from 'react';
const { Header, Footer, Sider, Content,  Checkbox, Form,} = Layout;
import 'antd/dist/antd.css'
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined} from '@ant-design/icons'; 
import Link from 'next/link';

export default function Home() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>With Run</title>
        <meta name="description" content="With Run" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
      <Content>
        <main className={styles.main}>
        <h1 className={styles.title}>
          With <a href="./">Run!</a>
        </h1>
            
            <Space direction="vertical" style={{marginTop: '20px'}}>
            <Input size="medium" placeholder="ID" prefix={<UserOutlined />} />
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <Button type="primary" block>
                
                <a href='/main'>
                  Login
                </a>
              </Button>
              <Button block>
                <a href='./signup'>
                Join
                </a>
              </Button>
            </Space>
     
          </main>

      </Content>
      <Footer></Footer>
    </Layout>

    </div>
  )
}

