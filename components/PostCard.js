import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment } from "antd";
import {ButtonGroup,  } from "antd/lib/button/button-group";
import { useSelector } from "react-redux";
import propTypes from 'prop-types';
import PostImages from "./PostImages";
import { useState } from "react";
import React from "react";

const PostCard = ({post})=>
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
        <>
        <div style={{marginBottom : 20, marginTop: 20 }}>
            <Card
            actions={[
                <RetweetOutlined key="retweet"/>,
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
                    avatar = {<Avatar>'최'</Avatar>}
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
        Images : propTypes.arrayOf(propTypes.object),
        
    }).isRequired,

};

export default PostCard;
