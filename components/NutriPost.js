import {Button, Form, Input,Container,Card ,Upload , message,Spin} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import {UploadOutlined, InboxOutlined} from '@ant-design/icons'
import FormData  from 'form-data';

// 2. POST - http://118.67.135.208:3000/upload
// 위 사진과 같이 form-data로 이미지를 "file" 형식으로 요청 보내시면 됩니다. 
// key는 "image", value는 이미지 파일 1개만 request body에 담아서 요청하시면 돼요!


const NutriPost = () =>
{   
     
    
    const formData = new FormData();
    const [imageToggle,setImageToggle] = useState(false);
    const onToggleImage = useCallback((e)=>
    {
        imageToggle === false ? setImageToggle(true): setImageToggle(false);
    })
    const [requestToggle, setRequestToggle] = useState(false);
    const onToggleRequestToggle = useCallback((e)=>{
        requestToggle === false? setRequestToggle(true): setRequestToggle(false);
    })
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: '',
        
        onChange(info) {
        console.log(info.file)
        console.log(typeof(info.file))
        
        formData.append('image',info.file)
        const { status } = info.file;
         
        if (status !== 'uploading') {
            console.log(info.file);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            
            
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        },
        onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
        formData.append('image',e.dataTransfer.files);
        },
    };

    const onSubmit = useCallback((e)=>{
            
            onToggleRequestToggle();
            message.success(`열심히 분석하고 있으니, 잠시만 기다려주세요!`);
            axios.post('http://118.67.135.208:3000/upload',
            formData,
            {
                headers:
                {
                    "Content-Type" : 'multipart/form-data'
                }
            }
            ).then((res)=>{
               console.log(res)
               console.log('hi')
        
              }).catch(function(error) {
                console.log(error)
                console.log('에러뜸')
              });
        
            });
    return(
        <>
      
        <Form style={{margin: '10px 0 0px'}} bordered={false}  onFinish={onSubmit}>
        
        <Dragger {...props} maxCount={1}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">오늘 먹은 음식의 사진을 올려주세요!</p>
            <p className="ant-upload-hint">
                회원님의 식단 영양소를 분석해드릴게요.
            </p>
        </Dragger>
        
         <div>
                <Button type="primary" style={{ float: 'right', marginTop: '10px' }} htmlType="submit">분석</Button>    
         </div>
         </Form>
         
         <div style={{marginBottom : 20, marginTop: 50 }}>
        
        
        
        
        {imageToggle === true &&
                  
                  (  <Card
                    hoverable='true'
                    
                       >
                           영양소 정보 :  
                           칼로리  :
                           이름:
                           열량:
    {/*                 
                        <Card.Meta style={{}}
                            description = ''     
                        /> */}
                    </Card>

                  )
                  
        }
        
                
                
       
         
         
          
            
        </div>
       
        </>
    
    )
}

export default NutriPost;
