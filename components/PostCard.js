import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment } from "antd";
import {ButtonGroup,  } from "antd/lib/button/button-group";
import { useSelector } from "react-redux";
import propTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Head from "next/head";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";


const PostCard = ({post})=>
{   
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
        <div style={{marginBottom : 20, marginTop: 50 }}>
        <Card>
        <Button onClick={postTest}>
            Test
        </Button>
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "100%", height: "360px" }}
            >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>작성자의 위치</div>
            </MapMarker>
            </Map>
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
                <Card.Meta
                    avatar = {<Avatar>최</Avatar>}
                    title = '제목'
                    description='내용'
                />
            </Card>
            {commentFormOpened && 
            (<div>
                <CommentForm />
                
                <List
                    header={`2개의 댓글`}
                    itemLayout="horizontal"
                    dataSource
                    renderItem= {(item)=>(
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
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
