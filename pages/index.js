import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout,Input, Space,Button,Menu,MenuItemProps,Form } from 'antd';
import React,{useState, useCallback} from 'react';
const { Header, Footer, Sider, Content,  Checkbox,} = Layout;
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
  const [id,setId] = useState('');
  const onChangeId = useCallback((e)=>{
      setId(e.target.value)
    },[])
  const [pw,setPw] = useState('');
  const onChangePw = useCallback((e)=>{
      setPw(e.target.value)
    },[])
  const onSubmit = useCallback((e)=>{
    const info = {'id': id, 'pw': pw}
    console.log(info)
    console.log(id,pw)
    
    },[id,pw])
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
         <Form style={{marginTop: '20px'}} onFinish={onSubmit}>
            <Space direction="vertical" style={{marginTop: '20px'}}>
            <Input size="medium" placeholder="ID" prefix={<UserOutlined />} value={id} onChange={onChangeId} />
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={pw} onChange={onChangePw}
              />
              <Button type="primary" htmlType='submit' block>
                  Login
              </Button>
              <Button block>
                <a href='./signup'>
                Join
                </a>
              </Button>
            </Space>
            </Form>
          </main>

      </Content>
      <Footer></Footer>
    </Layout>

    </div>
  )
}

