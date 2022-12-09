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
  const [toggleUpload, setToggleUpload ] = useState(false);
  const onChangeToggleUpload = useCallback((e)=>{
     toggleUpload !== true ? setToggleUpload(true) : setToggleUpload(false);
     console.log(toggleUpload);

  }) 
  const [imageId, setImageId] = useState('');
  const [imageName, setImageName] = useState('');
  const onChangeImageId = useCallback((e)=>{
    setImageId(e.taget.value);
  })
  const onChangeImageName = useCallback((e)=>{
    setImageName(e.taget.value);
    console.log(imageName)
  })
  const handleUpload = useCallback(() => {
    
    
    fileList.forEach((file) => {
      console.log(file)
      formData.append('image', file);
      setImageName(file.name)
      console.log(imageName)
    });
   
    setUploading(true);

    

    // You can use any AJAX library you like
    axios.post('https://api.withrun.click/freepost/post/image',
              formData , 
          {
          headers:
          {
            "Authorization" : "Bearer "+localStorage.getItem('Authorization'),
            'Content-Type': 'multipart/form-data'
          }
        }

        ).then((res)=>{
         
          console.log('1번 API Response',res)
          setFileList([]);


          axios.post('https://api.withrun.click/freepost/post/text',
            {
              'content': text, 
              'imageUrl': ('https://withrun.s3.ap-northeast-2.amazonaws.com/Server/'+localStorage.getItem('id')+'/'+imageName)
              // https://withrun.s3.ap-northeast-2.amazonaws.com/Server/1/foodimg1.jpg
            },
              {
              headers:
              {
                "Authorization" : "Bearer "+localStorage.getItem('Authorization'),
                
              }
            }
    
            )
            .then((res)=>{
            
              console.log('2번 API Response',res)
              message.success('글이 작성되었어요!');
              setImageId('');
              setText('');
            })
            .catch((error)=>{
              
              console.log('2번 API Error',error)

})
          // onChangeImageId(res.data.freePostImageDTO.id);
          // setImageId(res.data.freePostImageDTO.id)
          // console.log('이미지 ID', imageId)

          // console.log('text:', text, 'imageId :', imageId)
    
        }).catch(function(error) {
          message.error('글과 이미지를 모두 작성했는지 확인해주세요.');
          console.log(error);
          }) 
          .finally(() => {
          setUploading(false);
          setText('');
            });
   
     
      

});

  
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      setImageName(file.name);
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
