import {Button, Form, Input,Container,Card} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'


const CrewPost = () =>
{   

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
            placeholder="모집글을 작성해주세요!"
            />
        </Form>
        
        <div>
                <Button type="primary" style={{ float: 'right', marginTop: '5px' }} htmlType="submit">작성</Button>    
        </div>
       
        </>
    
    )
}

export default CrewPost;
