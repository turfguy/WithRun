import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout,Input, Space,Button,Menu,MenuItemProps,Breadcrumb, Card} from 'antd';
import React from 'react';
const { Header, Footer, Sider, Content,  Checkbox, Form, } = Layout;
import 'antd/dist/antd.css'
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined
,MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined, TeamOutlined
} from '@ant-design/icons'; 
import Link from 'next/link';


const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
export default function Main() {
    
    return (
    <div className={styles.container}>
        <Head>
        <title>With Run Main</title>
        <meta name="description" content="With Run" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
   
        <Layout>

         <Menu mode="horizontal" theme='light' style={{position: 'fixed', zIndex: 1, width: '100%',alignContent:'center'}}defaultSelectedKeys={['mail']}>
                    <Menu.Item key="main" icon={<HomeOutlined />}>
                                <a href='/main'>메인</a>
                    </Menu.Item>
               
                    <Menu.Item key="comm" icon={<TeamOutlined />}>
                                <a href='/comm'>커뮤니티</a>
                    </Menu.Item>
                    <Menu.Item key="three" icon={<AppstoreOutlined />}>
                        프로필
                    </Menu.Item>
                  
                </Menu>
      
     
        <Content>
            <div>
                
            </div>
            <main className={styles.main2}>
                게시판
            </main>

        </Content>
      <Footer>  
            

      </Footer>
    </Layout>

    </div>
  )
}
