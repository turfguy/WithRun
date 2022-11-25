import Link from 'next/link';
import {Menu, Input, Space, Row, Col, Card} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, SearchOutlined, CommentOutlined,AudioOutlined, ExperimentTwoTone, ProfileTwoTone, ThunderboltTwoTone,IdcardTwoTone, TwitterCircleFilled, TwitterSquareFilled, ThunderboltOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useCallback } from 'react';
import PostForm from '../components/PostForm';
import ReactMapGL, { NavigationControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
import PostList from '../components/PostList';
import PostMap from '../components/PostMap';

export default function comm() {
    
    return (
        <div>
          
                <h1 className={styles.title} style={{fontWeight: 'bold', marginTop: '30px', marginBottom: '50px'}} >
                            With <a style={{textDecoration:'none'}}>Run</a>
                </h1>
                <Menu style={{  marginBottom: 30}}theme='dark' mode='horizontal'>
          
                <Menu.Item  icon={<ThunderboltOutlined />}>
                
                        <a className='styles.title3' href='/main'  style={{textDecoration: 'none'}}>런메이트</a>
            
                 </Menu.Item> 
                <Menu.Item icon={<CommentOutlined />}>
                    
                <Link href="/comm">
                            자유게시판
                    </Link>

                </Menu.Item>

                

                </Menu>

       
               <Row gutter={8} >
            
            <Col xs={24} md={1}>
            
            </Col>
            <Col xs={24} md={17}>
               
                <PostMap/>
             

              
                
            </Col>  
            <Col xs={24} md={5} >
                     {/* <PostCard style={{}}/> */}
                    <PostList style={{marginTop:'50px'}}/>
                    <PostForm/>
                    
            </Col>
            <Col xs={24} md={1}>

            </Col>

        </Row>

    </div>
 

  )
}