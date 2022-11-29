import {Button, Form, Input,Container,Card,Popover} from 'antd'
import React,{ useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapInfoWindow, MapMarker,CustomOverlayMap } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'

const PostMap = () =>
{ 
  const KAKAOMAP_API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY
  const [mainData,setMainData] = useState('');
  useEffect((e)=>
  {
    axios.get('https://api.withrun.click/crewinfo')
    .then((res)=>{
      setMainData(res.data)
    }
    )
  })
  
  

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
              localStorage.setItem('latitude',position.coords.latitude)
              localStorage.setItem('longitude',position.coords.longitude)
              console.log('현재위치:',localStorage.getItem('latitude'),localStorage.getItem('longitude'))
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
            errMsg: "geolocation을 사용할수 없어요.",
            isLoading: false,
          }))
        }
      }, [])
    
      

    return(
        <>
        <Head>
            <script
                type="text/javascript"
                src={KAKAOMAP_API_KEY}        
                
                />   
        </Head>
        <h4 className={styles.title2} style={{ }}>
                            주변
                            <a style={{textDecoration:'none'}}>모집글</a>
          </h4> 
      
          <Card  bordered={false} >
          
        <Form style={{margin: '0px 0 0px'}} bordered={false} encType="multipart/form-data" >
         
                <Map 
                id = 'map'
                center={state.center}
                
                style={{ width: "100%", height: "530px" }}
                level={3} 
            >
                
                {!state.isLoading && (
                  <>
                <MapMarker position={state.center} >
                      {/* <Popover content={'현재 나의 위치가 표시됩니다.'} title={localStorage.getItem('userId')}>
                      <Button style={{zIndex:'1'}}>현재 나의 위치!</Button>
                     </Popover> */}
                     {/* 현재 나의 위치! */}
                </MapMarker>
              
                </>
                )}
                  <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                                  // 커스텀 오버레이가 표시될 위치입니다
                                  position={state.center}
                                  // 커스텀 오버레이가에 대한 확장 옵션
                                  xAnchor={0.3}
                                  yAnchor={0.91}
                                >
                                  <Popover content='작성하신 글이 이곳에 작성됩니다!' >
                                    <Button type="" style={{opacity:'0'}}>테스트</Button>
                                  </Popover>
                                </CustomOverlayMap>
              
              { mainData.results &&
                mainData.results.map((a,i)=>{
                    return(
                     <>
                  <MapMarker
                      // 마커를 생성합니다
                         position={{
                                    
                                        lat: mainData.results[i].latitude,
                                        lng: mainData.results[i].longitude
                                      
                                }}
                       
                        image={{
                                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                  size: {
                                    width: 24,
                                    height: 35
                                  }, // 마커이미지의 크기입니다
                                }}
                                
                    >
                      </MapMarker>
                      {/* <div style={{ margin:"5 10 10 5 ",  padding: "0px", color: "#000" }}>
                       {mainData.results[i].content}
                       </div> */}
                          <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                                  // 커스텀 오버레이가 표시될 위치입니다
                                  position={{
                                    lat: mainData.results[i].latitude,
                                    lng: mainData.results[i].longitude
                                  }}
                                  // 커스텀 오버레이가에 대한 확장 옵션
                                  xAnchor={0.3}
                                  yAnchor={0.91}
                                >
                                  <Popover content={mainData.results[i].content} title={mainData.results[i].author}>
                                    <Button type="" style={{opacity:'0'}}>{mainData.results[i].author}</Button>
                                  </Popover>
                                </CustomOverlayMap> 
                   
                      
                    </>
                  )
                })
              } 
                
           
                   </Map>
        </Form>

        </Card>
        </>
    
    )
}

export default PostMap;
