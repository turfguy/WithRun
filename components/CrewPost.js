import {Button, Form, Input,Container,Card ,Upload,message } from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';
import Script from 'next/script';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../styles/Home.module.css'
import {UploadOutlined} from '@ant-design/icons'
import { json } from 'react-router-dom';
import FormData  from 'form-data';


const CrewPost = () =>
{   
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const formData = new FormData();
  const handleUpload = useCallback(() => {
    
    console.log(fileList)
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    // const json = JSON.stringify({content:text, title: ' '});
    // console.log('json 내용',json)
    // const blob = new Blob ([json], { type : "application/json" });
    // console.log('blob',blob) 
    // formData.append('postingDTO',json);
    for (let key of formData.keys()) {
      console.log('key:', key, formData.get(key));
    }
    for (let val of formData.values()) {
      console.log('value:', val, formData.get(val))
    }
    
    setUploading(true);
    

    // You can use any AJAX library you like
    axios.post('https://api.withrun.click/freepost/post',
             formData,
          {
          headers:
          {
            "Authorization" : "Bearer "+localStorage.getItem('Authorization'),
            // 'Content-Type': 'multipart/form-data'
          }
        }

        ).then((res)=>{
         
          console.log(res)
          setFileList([]);
          message.success('upload successfully.');
        }).catch(function(error) {
          message.error('upload failed.');
          console.log(error);
          }) .finally(() => {
          setUploading(false);
            });

});

  //   fetch('https://api.withrun.click/freepost/post', {
      
  //     method: 'POST',
  //     headers:
  //     {
  //       "Authorization" : "Bearer "+localStorage.getItem('Authorization'),
  //       // "Content-Type" : 'multipart/form-data'
  //     },
  //     body:{
      

  //     }
      
      
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res)
  //       setFileList([]);
  //       message.success('upload successfully.');
  //     })
  //     .catch((error) => {
  //       message.error('upload failed.');
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setUploading(false);
  //     });

  // })
    
  
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
    return(
        <>  
        <Form style={{margin: '10px 0 0px'}} bordered={false}  >
                
            
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
                                            <Upload {...props} maxCount={1}>
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
                            onClick={handleUpload}

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
