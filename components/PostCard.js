import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment,Skeleton,Divider,Space } from "antd";
import {ButtonGroup,  } from "antd/lib/button/button-group";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Head from "next/head";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentForm from "./CommentForm";

const PostCard = ()=>
{   
    const [data, setData] = useState([]);
    useEffect(() => {
        // Perform localStorage action
        const item = localStorage.getItem('Authorization')
        axios.get('https://api.withrun.click/freepost',{
            headers:
          {
            "Authorization" : "Bearer "+item
          },
        })
        // .then((res) =>{res.json()
            // console.log(res)
        // })
         .then((res) => {
           setData(res.data.reverse());
           
         })
         .catch((error) => {
             console.log(error)
              });
      })

    const [liked,setLiked] = useState(false);
    const [commentFormOpened, setCommmentFormOpened] =  useState(false);

   
    function onToggleComment ()
    {
        commentFormOpened? setCommmentFormOpened(false) : setCommmentFormOpened(true)
    };
 
    return(
        // Get 받아서 Map으로 그려주도록하자
        <> 
        <div style={{marginBottom : 20, marginTop: 50 }}>
        <Space
                    direction="vertical"
                    size="large"

                >
        <Space
                    direction="vertical"
                    size="large"
                    style={{
                    display: 'flex',
                    }}
                >
         { data && data.map((a,i)=>{
             return(
                 <>
           
                <Card
                hoverable='true'
                className="antCard"
                cover={
                    <img
                      alt="example"
                      src={data[i].freePostImageDTO.url} 
                    
                    //   height="600"
                      style={{'objectFit': 'cover'}}
                        
                    />
                  }
                width='auto'
                height='auto'
                actions={[
                    
                    commentFormOpened? <MessageTwoTone twoToneColor="#00BFFF" key="comment" onClick={onToggleComment}/>  
                    :<MessageOutlined key="comment" onClick={onToggleComment} />,

               
                     
                ]}
                >
                
                    <Card.Meta 
                        avatar = {<Avatar>{data[i].author[0]}</Avatar>}
                        title = {data[i].author}
                        description = {data[i].content}     
                        
                    />
                </Card>
               
                {
                            commentFormOpened && 
                                (<div>
                                <CommentForm/>
                                <List
                                    header={data[i].freePostCommentDTOList.length+'개의 댓글'}
                                    itemLayout="horizontal"
                                    dataSource={data[i].freePostCommentDTOList}
                                    renderItem= {(item)=>(
                                        <li>
                                            <Comment
                                                author={item.author}
                                                avatar={<Avatar>{item.author[0]}</Avatar>}
                                                content={item.content}
                                            />
                                        </li>
                                )}
                                />
                            
                                </div>)
                
                }
                    
                </>
             )
         })
         }
          </Space>
            </Space>
        </div>
        </>
    );
}


export default PostCard;
