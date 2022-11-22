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
        console.log(text)
    })
    const onSubmit = useCallback((e)=>{
            console.log(text)
            console.log(latitude, longitude)
            axios.post('https://api.withrun.click/crewinfo/post',{

                'Authorization' : 
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiaXNzIjoiV2l0a…RmuH6MfQ9a8oHiV8BF2E63ZUpldbUOG7xrdfPv7_tm6j8c_ig',
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
        <h4 className={styles.title2} style={{marginTop : '40px'}}>
                            모집글 
                            <a style={{textDecoration:'none'}}>작성</a>
          </h4>     
          <Card style={{marginTop : 10}} >
          {/* <h4 className={styles.title2}>
                            모집글 <a style={{textDecoration:'none'}}>작성</a>
          </h4> */}
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
                
                <Card bordered={false}>
                <Map 
                center={state.center}
                
                style={{ width: "100%", height: "400px" }}
                level={3} 
            >
                {!state.isLoading && (
                <MapMarker position={state.center}>
                    <div style={{ padding: "5px", color: "#000" }}>
                    {state.errMsg ? state.errMsg : "여기에 계시는군요!"}
                    </div>
                </MapMarker>
                )}
                </Map>
              </Card>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={1000} rows={5}
            placeholder="모집글을 작성해주세요!"
            />
            <div>
                <Button type="primary" style={{ float: 'right', marginTop: '10px' }} htmlType="submit">작성</Button>    
            </div>
        </Form>
        </Card>
        </>
    
    )
}

export default PostForm;
