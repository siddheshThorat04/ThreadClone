import { TbLayoutSidebarRightInactive } from "react-icons/tb"
import Userheader from "../components/Userheader"
import Userpost from "../components/Userpost"
import Postpage from "./Postpage"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Userpage = () => {
  const {username}=useParams()
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser=async()=>{
      try {
        const res=await fetch(`/api/users/profile/${username}`)
        const data=await res.json()
        setUserData(data.user)
        console.log(data.user)
        if(data.error){

          alert("user not found" )
        }
      } catch (error) {
        res.status(500).json({message:error.message})
      }finally {
        setLoading(false)
      }
    }

    getUser()
  },[username])
  if (!userData && loading) {
    return (
      <div className="w-full h-screen flex justify-center text-black text-3xl items-center">
        Loading.....
      </div>
    );
    
  }

  return (
    <div>
      <Userheader user={userData}/> 
       {userData ? <Postpage/> : <></>}
    </div>
  )
}

export default Userpage
