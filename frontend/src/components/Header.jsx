import React from 'react'
import logo from '../assets/light-logo.svg'
const header = () => {
  return (
    <div  className='text-white  bg-slate-500 h-[10vh]  w-full flex justify-center items-center  ' >
        <img className='h-9'  src={logo} alt="" />
    </div>
  )
}

export default header
