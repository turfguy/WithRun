import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment,Skeleton,Divider,message, Upload } from "antd";
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

const NutriCard= ()=>
{   
    return(
        // Get 받아서 Map으로 그려주도록하자
        <>
         <div style={{marginBottom : 20, marginTop: 50 }}>
        
        <Card
                hoverable='true'
                
                   >
                       영양소 정보 :  
                       칼로리  :
                       이름:
                       열량:
{/*                 
                    <Card.Meta style={{}}
                        description = ''     
                    /> */}
                </Card>
                    
                
                
       
         
         
          
            
        </div>
        </>

             
    )

 }

export default NutriCard;
