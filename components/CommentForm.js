import {Form,Button,Input} from 'antd';
import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ()=>
{
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitForm  = useCallback(()=>
    {
        console.log(commentText);

    }, [commentText]);

    return(
        <Form onFinish={onSubmitForm}>
            <Form.Item style={{ position:"relative" , margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={2}/>
                <Button type='primary' htmlType='submit' style={{position: 'absolute', right: 0, bottom: -40}}>작성</Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm;