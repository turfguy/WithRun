import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment,Skeleton,Divider } from "antd";
import {ButtonGroup,  } from "antd/lib/button/button-group";
import { useSelector } from "react-redux";
import propTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Head from "next/head";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentForm from "./CommentForm";

const PostCard = ()=>
{   
    const [id,setId] = useState ('1');
    const [liked,setLiked] = useState(false);
    const [commentFormOpened, setCommmentFormOpened] =  useState(false);

    function onToggleLike ()
    {
        liked? setLiked(false): setLiked(true)
    };
    function onToggleComment ()
    {
        commentFormOpened? setCommmentFormOpened(false) : setCommmentFormOpened(true)
    };
 
    return(
        // Get 받아서 Map으로 그려주도록하자
        <> 
        <div style={{marginBottom : 20, marginTop: 50 }}>
       
        
            <Card
            hoverable='true'
            cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width="auto"
                  height="100"
                />
              }
            actions={[
                liked? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} /> : 
                <HeartOutlined key="heart" onClick={onToggleLike}/> ,
                commentFormOpened? <MessageTwoTone twoToneColor="#00BFFF" key="comment" onClick={onToggleComment}/>  
                :<MessageOutlined key="comment" onClick={onToggleComment} />,
                <Popover key="more" content={(
                    <Button.Group>
                               <> 
                                <Button type="dashed">수정</Button>
                                <Button type="dashed">삭제</Button>
                                </>
                        
                    </Button.Group>
                )}>
                    <EllipsisOutlined/>
                </Popover>
            ]}
            >
            
                <Card.Meta style={{}}
                    avatar = {<Avatar>글쓴이</Avatar>}
                    title = '글쓴이'
                    description = '수원시에서 달리고 있습니다!! 관심있으신 분은 연락주세요'        
                />
            </Card>
            {commentFormOpened && 
            (<div>
                <CommentForm/>
                <List
                    header={`개의 댓글`}
                    itemLayout="horizontal"
                    dataSource='ㅎㅇ'
                    renderItem= {(item)=>(
                        <li>
                            <Comment
                                author='ㅎㅇ'
                                avatar={<Avatar>댓글</Avatar>}
                                content='ㅎㅇ'
                            />
                        </li>
                )}
                 />
            
            </div>)
            }
        </div>
        </>
    );
}


export default PostCard;
