import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout,Input, Space,Button,Menu,MenuItemProps,InputNumber,Form,AutoComplete,
          Cascader,Checkbox,Col,Row,Select,} from 'antd';
const { Header, Footer, Sider, Content} = Layout;
import 'antd/dist/antd.css'
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined} from '@ant-design/icons'; 
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function  Signup()
{
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
    
    const [userId,setUserId] = useState('');
    const onChangeUserId = useCallback((e)=>{
        setUserId(e.target.value)
      },[])
    const [password,setPassword] = useState('');
    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value)
      },[])
    const [passwordCheck,setPasswordCheck] = useState('');
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value)
      },[])
    const [email,setEmail] = useState('');
    const onChangeEmail = useCallback((e)=>{
        setEmail(e.target.value)
      },[])
    const [username,setUsername] = useState('');
    const onChangeUsername = useCallback((e)=>{
        setUsername(e.target.value)
    })
    
    const onSubmit = useCallback((e)=>{
        const info = {'userId': userId, 'passowrd': password, 'email': email, 'username': username }
        console.log(info)
        console.log(userId,password,email,username)
    },[userId,password])
    return(
        <div>
        <Head>
        <title>With Run</title>
        <meta name="description" content="With Run" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
      <Content>
        <main className={styles.main}>
        <h1 className={styles.title}>
          Join <a href="./">Us</a>
        </h1>
        
        <Form style={{marginTop: '20px'}} onFinish={onSubmit}>
        <Form.Item
        name="ID"
        label="ID"
        rules={[
            {
              required: true,
              
            },
          ]}
        >
        <Input value={userId} required onChange={onChangeUserId}/>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input value={email} required onChange={onChangeEmail}/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password value={password} required onChange={onChangePassword} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password value={passwordCheck} required onChange={onChangePasswordCheck}/>
      </Form.Item>

      <Form.Item
        name="username"
        label="username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input value = {username} required onChange={onChangeUsername}/>
      </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
     
          </main>

      </Content>
      <Footer></Footer>
    </Layout>
    </div>
    )
}