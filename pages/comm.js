import Link from 'next/link';
import {Menu, Input, Space, Row, Col, Card, Carousel,Button} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, SearchOutlined, CommentOutlined,AudioOutlined, FundViewOutlined, ExperimentTwoTone, ProfileTwoTone, ThunderboltTwoTone,IdcardTwoTone, TwitterCircleFilled, TwitterSquareFilled, ThunderboltOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useCallback, useEffect } from 'react';
import PostForm from '../components/PostForm';
import ReactMapGL, { NavigationControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
import PostList from '../components/PostList';
import PostMap from '../components/PostMap';
import axios from 'axios';
import CrewPost from '../components/CrewPost';

export default function Comm() {
   
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    const [wirteOpen, setWriteOpen] = useState('false')
    const onToggleWrite = useCallback((e)=>{
         wirteOpen !=='true' ? setWriteOpen('true'): setWriteOpen('false')
         console.log(wirteOpen)
    })
    const [item,setItem] = useState('')
    useEffect(()=>{

    (typeof window !== 'undefined') ?  setItem(localStorage.getItem('username')) : ' '
    
   })

    return (
        <div>
          
                <h1 className={styles.title} style={{fontWeight: 'bold', marginTop: '30px', marginBottom: '50px'}} >
                            With <a style={{textDecoration:'none'}}>Run</a>
                </h1>

                <h4 style={{marginLeft: '20' , paddingLeft: '50', fontWeight: 'inherit'}} >
                    반갑습니다, 
                    <a style={{textDecoration:'none' , fontWeight: 'bolder'}}>
                        {item}
                        </a> 
                    
                    님!
                </h4>
                
                
                <Menu style={{  marginBottom: 30}}theme='dark' mode='horizontal'>
          
          <Menu.Item  icon={<ThunderboltOutlined />}>
          
                  <Link href='/main'>런메이트</Link>
      
           </Menu.Item> 
          <Menu.Item icon={<CommentOutlined />} >
                
          <Link  href='/comm' > 홍보게시판</Link>

          </Menu.Item>
          <Menu.Item icon={<FundViewOutlined />} >
                     
                     <Link  href='/nutri' > 영양소분석 </Link>
     
          </Menu.Item>
          </Menu>
       
               <Row gutter={8} >
            
            <Col xs={24} md={5}>
            
            </Col>
            <Col xs={24} md={14}>
            
             <h4 className={styles.title2} >
                            크루
                            <a style={{textDecoration:'none'}}>홍보글</a>
                </h4> 
                <CrewPost/>
                <PostCard />
                
            </Col>  
            
            <Col xs={24} md={5}>

            </Col>

        </Row>

    </div>
 

  )
}