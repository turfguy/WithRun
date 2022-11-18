import {Button, Form, Input,Container} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';

const PostForm = () =>
{   
    
    const [text, setText] = useState('');
    const onChangeText = useCallback((e)=>{
        setText(e.target.value);
    },[]);
    const onSubmit = useCallback(()=>{
            console.log(text)
    },[]);
    


    
    return(
        <>
        <Head>
            <script
                type="text/javascript"
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cde9d5084f1eaf59090943b96589e58f&libraries=services,clusterer&autoload=false"        
                
                />   
        </Head>
                
           
        <Form style={{margin: '10px 0 20px', marginTop: '20px'}} encType="multipart/form-data" onFinish={onSubmit}>
              <Map
                    center={{ lat: 33.5563, lng: 126.79581 }}
                    style={{ width: "100%", height: "360px" }}
                    >
                    <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
               
                    </MapMarker>
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
