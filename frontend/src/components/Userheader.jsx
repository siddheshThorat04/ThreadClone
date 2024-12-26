import React, { useEffect, useState } from 'react'
import userImage from "../assets/default_dp.png"
import { FaInstagram } from "react-icons/fa";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import { TbCopyCheckFilled } from "react-icons/tb";
import {useRecoilValue} from 'recoil';
import userAtom from '../atoms/userAtom';
import { FaRegCopy } from "react-icons/fa";


const Userheader = ({user}) => {
  const currentUser=useRecoilValue(userAtom)
  // const [following, setFollowing] = useState(user.followers.includes(currentUser._id));
  console.log("This is logged in user ",currentUser)
  console.log("this is  user",user)
  // console.log(following)
  const handleFollowUnfollow = async () => {
    try {
      const res=await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data=await res.json()
      if(data.error){
        alert(data.error)
        return
      }
      console.log(data)
    } catch (error) {
      alert(`error following ${user.username} `)
    }
  }
 if(user){
  return (
    <div className=' h-fit text-white  mt-4   px-3 py-3     '  >
        <div className="nameAndPic   flex justify-between   ">
        <div className="userinfo    ">
        <h1 className='text-3xl  font-thin  tracking-tighter'>{user.name}</h1>
        <p className='mt-1  '>{user.username}<span className='text-sm ml-2 bg-zinc-800 font-light rounded-lg px-2  '  >thread.next</span>   </p>
       
        {(currentUser.username !== user.username) && (<button className='border-2 px-3 py-1 rounded mt-3' onClick={handleFollowUnfollow} >  Follow </button>  )}
        </div>
        <div className="userImage overflow-hidden    h-24 w-24 bg-slate-300  rounded-full  "  > <img className=' h-full  '  src={userImage} alt="" />  </div>
        </div>
        <div className="about text-base   text-slate-300  tracking-tight   ">{user.bio} </div>
        <div className='flex justify-between'>
        <p  className="socialHandle flex  items-center  mt-4 text-zinc-400    font-thin  font-sans    ">{user.followers.length} followers • <a href="https://www.instagram.com/zuck/"  target='blank'  className='mx-1'  >instagram.com</a> </p> <span className='flex text-3xl      gap-1 '  > <FaInstagram className='instaicon rounded-full   px-1  '  />  </span>
        </div>
        <div  className='flex justify-between font-bold   mt-6 ' >
          <h1 className='w-1/2  flex justify-center  h-8  border-b-2  '   >Threads</h1>
          <h1 className='w-1/2  flex justify-center  h-8  border-b-2 border-gray-600  '  >Replies</h1>
        </div>
    </div>
  )}
  else{
    return(
    <div className='text-white h-screen  flex justify-center items-center  text-3xl'>No user Found</div>
    )
  }
}

export default Userheader
