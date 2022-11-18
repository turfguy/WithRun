import {Button, Form, Input} from 'antd'
import { useCallback, useRef, useState, useEffect} from 'react';

const PostForm = () =>
{   
    const [text, setText] = useState('');
    const onChangeText = useCallback((e)=>{
        setText(e.target.value);
    },[]);
    const onSubmit = useCallback(()=>{
            console.log(text)
    },[]);
    
    return(
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
                    
            <Input.TextArea value={text} onChange={onChangeText} maxLength={1000} placeholder="모집글을 작성해주세요!"/>
            <div>
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }} htmlType="submit">작성</Button>    
            </div>
        </Form>
    )
}

export default PostForm;
