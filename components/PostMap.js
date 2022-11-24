import {Button, Form, Input,Container,Card} from 'antd'
import React,{ useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'

const PostMap = ({markerdata}) =>
{  

    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[text,setText] = useState('');

    const onChangeText = useCallback((e)=>
    {
        setText(e.target.value)
        console.log(text)
    })
    const onSubmit = useCallback((e)=>{
            console.log(text)
            console.log(latitude, longitude)
            axios.post('https://api.withrun.click/crewinfo/post',{

                'Authorization' : 
                localStorage.getItem('token'),
                'crewInfoDTO':
                {
                  'content': text,
                  'latitude': latitude,
                  'longitude': longitude 
                }
    
            }).then((res)=>{
             
               console.log(res.data)
        
                console.log(res)
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
              console.log(latitude,longitude)
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
        <h4 className={styles.title2} style={{ }}>
                            주변
                            <a style={{textDecoration:'none'}}>모집글</a>
          </h4> 
          
          <Card  bordered={false} >
          
        <Form style={{margin: '0px 0 0px'}} bordered={false} encType="multipart/form-data" onFinish={onSubmit}>
                
                <Map 
                id = 'map'
                center={state.center}
                
                style={{ width: "100%", height: "530px" }}
                level={3} 
            >
                
                {!state.isLoading && (
                <MapMarker position={state.center}>
                    <div style={{ padding: "3px", color: "#000" ,margin: '0px  0px'}}>
                    {state.errMsg ? state.errMsg : "지금 나의 위치👻"}
                    </div>
                </MapMarker>
                )}
              
                  {/* <MapMarker // 마커를 생성합니다
                        position={{
                        // 마커가 표시될 위치입니다
                        lat: lat,
                        lng: lng,
                        }}
                    >
                         <div style={{ padding: "3px", color: "#000" ,margin: '0px  0px'  }}>
                           상대방의 위치👻
                        </div>
                    </MapMarker> */}
                </Map>
        </Form>
        </Card>
        </>
    
    )
}

export default PostMap;
