import {Button, Form, Input,Container,Card} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'


const PostForm = () =>
{   

    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[text,setText] = useState('');
    const onChangeText = useCallback((e)=>
    {
        setText(e.target.value)
  
    })
    const onSubmit = useCallback((e)=>{
            
            axios.post('https://api.withrun.click/crewinfo/posting',{    
                
                  'content': text,  
                  'latitude':localStorage.getItem('latitude'),
                  'longitude':localStorage.getItem('longitude'),
                  
            },
            {
              headers:
              {
                "Authorization" : "Bearer "+localStorage.getItem('Authorization')
              }
            }
            
            ).then((res)=>{
               setText('');
              }).catch(function(error) {
              
              });
        
            },[text]);
    

    const [state, setState] = useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
      })
    
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => 
            {  
              setLatitude(position.coords.latitude),
              setLongitude(position.coords.longitude),
              
              setState((prev) => ({
                ...prev,
                center: {
                  lat: position.coords.latitude, // 위도
                  lng: position.coords.longitude, //경도
                   
                },
                isLoading: false,

              }))
            
            },
            (err) => {
              setState((prev) => ({
                ...prev,
                errMsg: err.message,
                isLoading: false,
              }))
            }
          )
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          setState((prev) => ({
            ...prev,
            errMsg: "geolocation을 사용할수 없어요..",
            isLoading: false,
          }))
        }
      }, [])
    
    return(
        <>
        <Head>
            <script
                type="text/javascript"
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cde9d5084f1eaf59090943b96589e58f&libraries=services,clusterer&autoload=false"        
                
                />   
        </Head>
        
        <Form style={{margin: '10px 0 0px'}} bordered={false} encType="multipart/form-data" onFinish={onSubmit}>
                
            
               <Input.TextArea value={text} onChange={onChangeText} maxLength={100} rows={3} cols={1}
            placeholder="모집글을 작성해주세요!"
            />
            <div>
                <Button type="primary" style={{ float: 'right', marginTop: '10px' }} htmlType="submit">작성</Button>    
            </div>
        </Form>
       
        </>
    
    )
}

export default PostForm;
