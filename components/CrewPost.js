import {Button, Form, Input,Container,Card ,Upload,message } from 'antd'
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
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = useCallback(() => {
    const formData = new FormData();
   
    console.log(fileList[0])
    fileList.forEach((file) => {
      formData.append('files[]', file);
      console.log('file',file)
         });
    setUploading(true);

    // You can use any AJAX library you like
    fetch('https://api.withrun.click/freepost/post', {
      
      method: 'POST',
      headers:
      {
        "Authorization" : "Bearer "+localStorage.getItem('Authorization')
      },
      title : ' ',
      content: text,
      image: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch((error) => {
        message.error('upload failed.');
        console.log(error);
      })
      .finally(() => {
        setUploading(false);
      });

  })
    
  
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
    const[text,setText] = useState('');
    const onChangeText = useCallback((e)=>
    {
        setText(e.target.value)
  
    })
    const onSubmit = useCallback((e)=>{
            console.log(normFile);
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
               console.log(res)
               window.location='/comm';
        
              }).catch(function(error) {
              
              });
        
            },[text]);
    return(
        <>  
        <Form style={{margin: '10px 0 0px'}} bordered={false} encType="multipart/form-data" onFinish={handleUpload}>
                
            
               <Input.TextArea value={text} onChange={onChangeText} maxLength={100} rows={5} cols={1}
            placeholder="회원님의 크루 홍보글을 작성해주세요!"
            />
            <Form.Item
                        style={{marginTop:'30'}}
                        name="upload"
                        label="이미지"
                        valuePropName="fileList"
                       
                        extra=""
                      >
                                            <Upload {...props}>
                            <Button style={{marginTop: 10 }}icon={<UploadOutlined />}>홍보 이미지를 업로드해주세요.</Button>
                          </Upload>
                          <Button
                            type="primary"
                            htmlType='submit'
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{
                              marginTop: 16,
                              float:'right'
                            }}
                          >
                            {uploading ? '이미지 업로드와 글 작성을 해주세요!' : '작성'}
                          </Button>
                      </Form.Item>  
        </Form>
        
        <div>           

                    
        </div>
       
        </>
    
    )
}

export default CrewPost;
