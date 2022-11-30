import {Button, Form, Input,Container,Card ,Upload } from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import {UploadOutlined} from '@ant-design/icons'


const CrewPost = () =>
{   
      const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    const[text,setText] = useState('');
    const onChangeText = useCallback((e)=>
    {
        setText(e.target.value)
  
    })
    const onSubmit = useCallback((e)=>{
            
            axios.post('https://api.withrun.click/freepost/post',{    
               
                'content': text,  

            },
            {
              headers:
              {
                "Authorization" : "Bearer "+localStorage.getItem('Authorization')
              }
            }
            
            ).then((res)=>{
             
               window.location='/comm';
        
              }).catch(function(error) {
              
              });
        
            },[text]);
    return(
        <>
        <Form style={{margin: '10px 0 0px'}} bordered={false} encType="multipart/form-data" onFinish={onSubmit}>
                
            
               <Input.TextArea value={text} onChange={onChangeText} maxLength={100} rows={5} cols={1}
            placeholder="회원님의 크루 홍보글을 작성해주세요!"
            />
            <Form.Item
                        style={{marginTop:'10'}}
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra=""
                      >
                        <Upload name="logo" action="/upload.do" listType="picture">
                          <Button icon={<UploadOutlined />}> 업로드할 이미지를 선택하세요.</Button>
                        </Upload>
                        <Button type="primary" style={{ float: 'right', marginTop: '0px' }} htmlType="submit">작성</Button>
                      </Form.Item>  
        </Form>
        
        <div>           

                    
        </div>
       
        </>
    
    )
}

export default CrewPost;
