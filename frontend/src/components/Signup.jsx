
import React, { useState } from 'react'
import { redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import authScreenState from '../atoms/authAtom';
import authScreen from '../atoms/authAtom';
import { useRecoilState, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom';


const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
 
  const setUser = useSetRecoilState(userAtom)

  
  
  const handleSignup = async (e) => {
   try {
    e.preventDefault()
    const res= await fetch("/api/users/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(inputs)
    })
      const data = await res.json()
      console.log(data)
      if(data.error){
        const err=data.error
        alert(err)
      }
      localStorage.setItem("user-info",JSON(data))
      setUser(data)
   } catch (error) {
    console.log(error.message)
   }

  }
  const  setScreenState=useSetRecoilState(authScreen)
  return (
    <>

      <form action=" "  className='flex bg-zinc-300    min-w-[300px] relative px-5 py-5  rounded-xl flex-col gap-3   max-w-[30vw] mx-auto '  >
        <input type="text" className='px-3 py-3 rounded-lg    font-bold  ' onChange={(e) => setInputs({ ...inputs, username: e.target.value })} name="username" placeholder="username" value={inputs.username} />
        <input type="text" className='px-3 py-3 rounded-lg   font-bold  ' onChange={(e) => setInputs({ ...inputs, name: e.target.value })} name="name" placeholder="name" value={inputs.name} />
        <input type="text" className='px-3 py-3 rounded-lg   font-bold  ' onChange={(e) => setInputs({ ...inputs, email: e.target.value })} name="email" placeholder="email" value={inputs.email} />
        <input type={showPassword ? "text" : "password"} className='px-3 py-3 rounded-lg   font-bold  ' onChange={(e) => setInputs({ ...inputs, password: e.target.value })} name="password" placeholder="passkey" value={inputs.password} />
        <button type='submit' onClick={handleSignup} className='px-3 py-3 rounded-lg border-2 w-1/2  mx-auto    border-blue-600    font-bold'    >Signup</button>
        <h1 className='   text-black  text-lg ' >Already have an account? <Link  className='text-blue-600'  onClick={()=>setScreenState("login")} > Login</Link></h1>
      </form>
    </>
  )
}

export default signup