import Link from 'next/link';
import {Menu, Input, Space, Row, Col, Card} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, SearchOutlined, CommentOutlined,AudioOutlined, ExperimentTwoTone, ProfileTwoTone, ThunderboltTwoTone,IdcardTwoTone, TwitterCircleFilled, TwitterSquareFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useCallback } from 'react';
import PostForm from '../components/PostForm';
import ReactMapGL, { NavigationControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css'

export default function Main() {
    
    return (
        <div>
        <Menu mode='horizontal'>
            <Menu.Item  icon={<ThunderboltTwoTone />}>
                
                        With<a style={{textDecoration: 'none'}}>Run</a>
            
            </Menu.Item>
        <Menu.Item icon={<CommentOutlined />}>
            
        <Link href="/comm">
                    자유게시판
            </Link>

        </Menu.Item>

        <Menu.Item >
            <Input.Search enterButton style={{ marginTop : '6px'}} />
        </Menu.Item>

        </Menu>
        <Row gutter={8} >
            <Col xs={24} md={2}>
            </Col>
            <Col xs={24} md={18}>
                <h1 className={styles.title}>
                            With <a style={{textDecoration:'none'}}>Run</a>
                </h1>
                <PostForm/>
                <h4 className={styles.title2} style={{marginTop:10}}>
                            실시간<a style={{textDecoration:'none'}}>모집글</a>
                 </h4>
                <PostCard style={{}}/>
            </Col>
            <Col xs={24} md={4}>
                <a style={{marginTop: '20px'}}href="https://github.com/turfguy/withRun" target="_blank" rel='noopener norefferer'> Copyright © 2022 withRun  </a>
                
            </Col>

        </Row>

    </div>
 

  )
}