import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import authScreen from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'
const Login = () => {

  const setScreenState = useSetRecoilState(authScreen)
  const [inputs, setinputs] = useState({
    username: "",
    password: ""
  });
  const setUser = useSetRecoilState(userAtom)
  const handleLogin = async (e) => {
    try {


      e.preventDefault()
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        return
      }
      console.log(data)
      localStorage.setItem("user-info", JSON.stringify(data))
      setUser(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <form action=" " className='flex relative   min-w-[300px]   px-5 py-5 bg-zinc-300 rounded-xl flex-col gap-3   max-w-[30vw] mx-auto '  >
        <input type="text" className='px-3 py-3 rounded-lg    font-bold  ' onChange={(e) => setinputs({ ...inputs, username: e.target.value })} name="username" placeholder="username" />

        <input type="password" className='px-3 py-3 rounded-lg   font-bold  ' onChange={(e) => setinputs({ ...inputs, password: e.target.value })} name="password" placeholder="passkey" />
        <button type='submit' onClick={handleLogin} className='px-3 py-3 rounded-lg border-2 w-1/2  mx-auto    border-blue-600    font-bold'    >Login</button>
        <h1 className='   text-black  text-lg ' >don't have an account?<Link className='text-blue-600' onClick={() => setScreenState("signup")} > Signup</Link></h1>
      </form>
    </>
  )
}

export default Login
