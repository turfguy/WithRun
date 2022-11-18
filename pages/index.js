import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout,Input, Space,Button,Menu,MenuItemProps,Form } from 'antd';
import React,{useState, useCallback} from 'react';
const { Header, Footer, Sider, Content,  Checkbox,} = Layout;
import 'antd/dist/antd.css'
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined} from '@ant-design/icons'; 
import Link from 'next/link';
import axios from 'axios';


export default function Home() {
  const [userId,setUserId] = useState('');
  const onChangeUserId = useCallback((e)=>{
      setUserId(e.target.value)
    },[])
  const [password,setPassword] = useState('');
  const onChangePassword = useCallback((e)=>{
      setPassword(e.target.value)
    },[])
  const onSubmit = useCallback((e)=>{
    const info = {'userId': userId, 'password': password}
      window.location='/main';
   
    // axios.post('https://api.withrun.click/auth/signin',{
    //       'userId': userId, 'password': password
    //   }).then((res)=>{
    //    window.location = '/main';
    //     console.log(res)
    //   }).catch(function(error) {
    //      alert('아이디 혹은 패스워드가 옳지 않습니다!')
    //     console.log(error);
    //   });
    },[userId,password])

 
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
            <Input size="medium" placeholder="ID" prefix={<UserOutlined />} value={userId} onChange={onChangeUserId} />
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={password} onChange={onChangePassword}
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

