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
import CommentForm from "./CommentForm";
import InfiniteScroll from 'react-infinite-scroll-component';

const PostCard = ({post})=>
{   

    const [commentId,setCommentId] = useState('최현욱');
    const [commentCon,setCommentCon] = useState('좋아요');
    
    const postTest = useCallback((e)=>{
        
        axios.get("https://api.withrun.click/crewinfo",
        {
            header: 
                {
                    "Authorization":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiaXNzIjoiV2l0a…RmuH6MfQ9a8oHiV8BF2E63ZUpldbUOG7xrdfPv7_tm6j8c_ig"
                }
        }
        
        )
    .then(function (response) {
         console.log(response)
    }).catch(function (error) {
        console.log(error)
    }).then(function() {
        // 항상 실행
    });}
    )

    
    const [state, setState] = useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
      })


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
        <>
        <Head>
            <script
                type="text/javascript"
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cde9d5084f1eaf59090943b96589e58f&libraries=services,clusterer&autoload=false"        
                
                />   
        </Head>
        <div style={{marginBottom : 20, marginTop: 10 }}>
        <Card>
        <Button onClick={postTest}>
            Test
        </Button>
       
            <Card
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
                    description = '오늘 뛰실 분은 연락주세요'
                    
                />
                      <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "100%", height: "400px" ,marginTop: '20px' }}
            >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>작성자의 위치</div>
            </MapMarker>
            </Map>
            </Card>
            {commentFormOpened && 
            (<div>
                <CommentForm />
                
                <List
                    header={`${commentCon.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={commentCon}
                    renderItem= {(item)=>(
                        <li>
                            <Comment
                                author={commentId}
                                avatar={<Avatar>{commentId[0]}</Avatar>}
                                content={commentCon}
                            />
                        </li>
                )}
                 />
            
            </div>)
            }
            </Card>
        </div>
        </>
    );
}

PostCard.propTypes = {
    post : propTypes.shape({
        id : propTypes.number ,
        User : propTypes.object,
        content : propTypes.string,
        createdAt : propTypes.object,
        Comments : propTypes.arrayOf(propTypes.object),
    }).isRequired,

};

export default PostCard;
