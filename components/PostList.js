import { Avatar, Button, Card, List, Popover,Comment,Skeleton,Divider,Form} from "antd";
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

const PostList = ({post})=>
{   
      
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) =>
         res.json()
        )
        .then((body) => {
          setData([...data, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    useEffect(() => {
      loadMoreData();
    }, []);
    return(
        
            <>
                    <div
                    id="scrollableDiv"
                    style={{
                        margin: '60px 0px 0px',
                        height: 400,
                        overflow: 'auto',
                        padding: '0 12px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                    >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 50}
                        loader={
                        <Skeleton
                            avatar
                            paragraph={{
                            rows: 1,
                            }}
                            active
                        />
                        }
                        endMessage={<Divider plain>더 이상 글이 없어요!🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key= {item.email}>
                            <List.Item.Meta
                                avatar={<Avatar>{item.name.last[0]}</Avatar>}
                                title={item.name.last}
                                // description={item.email} //글내용
                                description={'같이 뛸 사람 연락주세요!! 010-3113-0360, 오늘 저녁 8시 광교호수공원'}
                            />
                            <div>Content</div> 
                      {/* 시간 , 날짜 정도? */}
                            </List.Item>
                        )}
                        />
                    </InfiniteScroll>
                
            </div>

        </>
        
    )   
};
export default PostList;
