import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({images})=>
{
    const [showImagesZoom,setShowImagesZoom] = useState(false);

    const onZoom = useCallback(()=>{
        setShowImagesZoom(true);
    },[]);
    const onClose = useCallback(()=>{
        setShowImagesZoom(false);
    },[]);
    if (images.length === 1){
        return(
            <>
                <img role="presentation" width="100%" style={{maxHeight:'400px', maxWidth:'800px'}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom onClose={onClose} images={images}/>}
            </>
        )
    }
    if (images.length === 2){
        return(
            <>
                <img role="presentation" style={{width:"50%",display:'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                <img role="presentation" style={{width:"50%",display:'inline-block'}} src={images[1].src} alt={images[1].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom onClose={onClose} images={images}/>}
             </>
        )
    }
    return(
        <>
           <div>
               <img role="presentation" style={{width:"50%"}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
            <div role="presentation"
                style={{ display: 'inline-block' , width: '50%', textAlign: 'center', verticalAlign:'middle' }}
                onClick={onZoom}
            >
                <PlusOutlined/>
                <br/>
                { images.length - 1} 개의 사진 더보기
            </div>
            {showImagesZoom && <ImagesZoom onClose={onClose} images={images}/>}
        </div>
        </>
    )
};

PostImages.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object)
}   
export default PostImages;
