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
import { json } from 'react-router-dom';

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
            
            setImageToggle(true);
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
        
        
        
         <h4 className={styles.title2} >
                            분석
                            <a style={{textDecoration:'none'}}>결과</a>
            </h4>
        {imageToggle === true &&
                  
                  (  <Card
                    hoverable='true'
                    style={{'whiteSpace': 'pre-line' , 'alignItems': 'center'}}
                    height='150'
                    cover={
                    <img
                      alt="example"
                    src='https://i.ytimg.com/vi/O9blLYzVWEM/maxresdefault.jpg'
                    width="auto"
                      height="300"
                    />
                  }
                    me
                    
                       >  

                       <p>이름 : 고기만두</p> 
                       <p>총량 : 250g</p>
                       <p>칼로리 : 454.39Kcal</p> 
                       <p>   탄수화물 : 51.34g</p>
                       <p>   당류 : 2.4g   </p>
                       <p>지방 : 18.25g</p> 
                       <p>단백질 : 18.66g</p> 
                       <p>     나트륨 : 621.71mg </p>
                       <p>콜레스테롤 : 21.0g</p>
                       <p>   트랜스지방 : 0.0g </p>
                        
                       
                       
                       
                        {/* <Card.Meta style={{}}
                            description = ''     
                        /> */}
                    </Card>

                  )     
                }
        
                 <Card
                    hoverable='true'
                    style={{'whiteSpace': 'pre-line' , 'alignItems': 'center' ,'marginTop': '20'}}
                    height='150'
                    cover={
                    <img
                      alt="example"
                    src='https://desion.kr/web/product/tiny/202101/7b8394ed298eafcde0ad47a0bc64de83.jpg'
                    width="auto"
                      height="300"
                    />
                  }
                    me
                    
                       >  

                                        <p>  이름 : 떡볶이  </p>
                                        <p>  총량 : 200.0g  </p>
                                        <p>   칼로리 :300.76kcal </p>
                                        <p>   탄수화물 : 58.85g</p>
                                        <p>   당류 : 5.7g   </p>
                                        <p>   지방 : 2.96g</p>
                                        <p>     단백질 : 8.72g </p>
                                        <p>     나트륨 : 862.23mg </p>
                                        <p>    콜레스테롤 : 6.0g </p>
                                        <p>   트랜스지방 : 0.0g </p>
                        
                    </Card>

                    <Card
                    hoverable='true'
                    style={{'whiteSpace': 'pre-line' , 'alignItems': 'center' ,'marginTop': '20'}}
                    height='150'
                    width='auto'
                    cover={
                    <img
                      alt="example"
                    src='http://gdimg.gmarket.co.kr/2262322531/still/600?ver=1638510565'
                    width="auto"
                      height="300"
                    />
                  }
                    me
                    
                       >  

                                <p> 이름 : 불고기덮밥   </p>
                                <p>  중량 : 500g  </p>
                                <p> 칼로리 : 699.96kcal   </p>
                                <p>  탄수화물 : 92.09g  </p>
                                <p>  당류 : 5.99g  </p>
                                <p>  지방 : 21.4g  </p>
                                <p> 단백질 : 29.31 </p>
                                <p> 나트륨 : 1182.88mg </p>
                                <p> 콜레스테롤 : 72.0mg </p>
                                <p> 트랜스지방 : 0.0g </p>
                        
                    </Card>
                
       
         
         
          
            
        </div>
       
        </>
    
    )
}

export default NutriPost;
