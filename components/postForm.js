import {Button, Form, Input,Container} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';

const PostForm = () =>
{   

    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[text,setText] = useState('');
    const onChangeText = useCallback((e)=>
    {
        setText(e.target.value)
        console.log(text)
    })
    const onSubmit = useCallback(()=>{
            console.log(text)
            console.log(latitude, longitude)
    },[]);
    

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
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
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
                  lng: position.coords.longitude,
                   // 경도
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
                
           
        <Form style={{margin: '10px 0 20px', marginTop: '20px'}} encType="multipart/form-data" onFinish={onSubmit}>
                <Map // 지도를 표시할 Container
                center={state.center}
                style={{
                // 지도의 크기
                width: "100%",
                height: "450px",
                }}
                level={3} // 지도의 확대 레벨
            >
                {!state.isLoading && (
                <MapMarker position={state.center}>
                    <div style={{ padding: "5px", color: "#000" }}>
                    {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
                    </div>
                </MapMarker>
                )}
                </Map>

            <Input.TextArea value={text} onChange={onChangeText} maxLength={1000} placeholder="모집글을 작성해주세요!"/>
            <div>
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }} htmlType="submit">작성</Button>    
            </div>
        </Form>
        </>
    
    )
}

export default PostForm;
