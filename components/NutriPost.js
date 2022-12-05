import {Button, Form, Input,Container,Card ,Upload , message} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import {UploadOutlined, InboxOutlined} from '@ant-design/icons'

const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        },
        onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
        },
    };
const NutriPost = () =>
{   
     
    

    const onSubmit = useCallback((e)=>{
            
            axios.post('https://api.withrun.click/freepost/post',{    
               
              'image': props

            },
            {
              headers:
              {
                "Authorization" : "Bearer "+localStorage.getItem('Authorization')
              }
            }
            
            ).then((res)=>{
               console.log(res)
               window.location='/comm';
        
              }).catch(function(error) {
              
              });
        
            });
    return(
        <>
      
        <Form style={{margin: '10px 0 0px'}} bordered={false} encType="multipart/form-data" onFinish={onSubmit}>
        
        <Dragger {...props}>
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
        
        <div>           

                    
        </div>
       
        </>
    
    )
}

export default NutriPost;
