import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dp from '../assets/default_dp.png'
import post1 from '../assets/post1.png'
import verified from '../assets/verified.png'
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiCircleMore, CiLinkedin } from "react-icons/ci";




const Userpost = ({likes,postImage, replies, postTitle}) => {
    

    const [likeCount, setlikeCount] = useState(likes);
    const [status, setStatus] = useState(false);

    const handleLike = () => {
        if(status){
            setlikeCount(likeCount-1)
            setStatus(false)
            
        }
        else{
            setlikeCount(likeCount+1)
            setStatus(true)
        }
        
    }

    return (

        <div className='w-full    py-3 '   >
            <div className="user ">
                <div className='flex gap-3 text-white'>
                    <div className="dp  h-[10vh]  rounded-full w-[10vh] overflow-hidden    "><img className='h-full' src={dp} alt="" /> </div> <span className='flex h-7 gap-2  items-center  '>markZuckerberg<img className='w-4 mt-1  h-4' src={verified} alt="" /></span>  </div>
            </div>
            <Link to={"/markzukerberg/post/1"}>
                <div className="post border-l-2  w-[95%]   mx-8 pl-10  my-[-20px]   text-white "> <div  className='flex justify-between   pr-5  ' >  <div className="title">{postTitle} </div><span className='text-slate-600'  >1d</span></div>
                    <div className="postimg rounded overflow-hidden mt-2 w-full   "><img src={postImage} alt="" /></div>
                </div>
            </Link>
            <div className="postFooter  pl-[7vw]">
                <div className="actions     flex gap-3  text-2xl text-white   font-light mt-8 "> <SlLike onClick={() => handleLike()   }  id="like"    />  <FaRegComment /> <BiRepost /> <CiCircleMore />
                </div>
                <div className=" text-sm mt-4  font-light text-white  flex gap-2 "><h3>{replies} Comments •</h3><h3>{likeCount} likes</h3></div>
            </div>

        </div>
    )
}

export default Userpost
