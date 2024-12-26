import React, { useState } from 'react'
import Signup from '../components/signup'
import Login from '../components/Login'
import authScreen from '../atoms/authAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
const Auth = () => {
  const authScreenState=useRecoilValue(authScreen)
  console.log(authScreenState)
  
  return (
    <>
      <div  className='   h-fit flex gap-3 justify-center items-center  absolute top-1/2 left-1/2 rounded-xl  -translate-x-1/2 -translate-y-1/2     ' >
      

      {authScreenState==="login" ? <Login/> : <Signup/>}

      
      </div>

    </>
  )
}

export default Auth
