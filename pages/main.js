import Link from 'next/link';
import {Menu, Input, Space, Row, Col, Card} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, SearchOutlined, AudioOutlined, ExperimentTwoTone, ProfileTwoTone, IdcardTwoTone, TwitterCircleFilled, TwitterSquareFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useCallback } from 'react';
import PostForm from '../components/postForm';

export default function Main() {
    
    return (
        <div>
        <Menu mode='horizontal'>
            <Menu.Item  icon={<MailOutlined />}>
            <Link href="/main">
                
                        withrun!
            </Link>
           
            </Menu.Item>
        <Menu.Item icon={<ProfileTwoTone />}>
            
        <Link href="/profile">
                    자유게시판
            </Link>

        </Menu.Item>

        <Menu.Item >
            <Input.Search enterButton style={{ marginTop : '6px'}} />
        </Menu.Item>

        </Menu>
        <Row gutter={8} >
            
            <Col xs={24} md={20}>
                <PostForm/>
            </Col>
            <Col xs={24} md={4}>
                <a href="https://github.com/turfguy" target="_blank" rel='noopener norefferer'> 김승민이 만듬  </a>
            </Col>

        </Row>

    </div>
 

  )
}