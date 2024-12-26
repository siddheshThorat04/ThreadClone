import React from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Userpage from './pages/Userpage'
import Postpage from './pages/Postpage'
import Header from './components/Header'
import Userheader from './components/Userheader'
import Homepage from './pages/Homepage'
import Auth from './pages/Auth'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import LogoutButton from './components/LogoutButton'
import CreatePost from './components/CreatePost.jsx'
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Chatpage from './components/Chatpage.jsx'
import { FaRocketchat } from "react-icons/fa";

const App = () => {
  const user=useRecoilValue(userAtom)
  // console.log(user)
  console.log(user)
  return (
    <main className='w-full h-fit min-h-screen bg-black  '  >
    <div  className= '  text -white h-fit  w-[50vw]  mx-auto  bg-black'    >
      <div className='w-full flex justify-between px-8 text-3xl' >
    <a href="/"  className='text-white'    ><  IoHomeOutline/></a>{user && <a  href={`/${user.username}` } className='text-white    '  ><CgProfile /></a>}<a href="/chat"  className='text-white'    ><FaRocketchat/></a>
    </div>
      <Header/>
      
        <Routes>
          <Route path='/'  element={ user?<Homepage />:<Navigate to="/auth" />}  >  </Route>
          <Route path='/auth'  element={!user ?<Auth/>:<Navigate to="/" />}  >  </Route>
          <Route path='/:username'  element={<Userpage />}  >  </Route>
          <Route path='/:username/post/:id'  element={<Postpage />}  >  </Route>
          <Route path='/chat'  element={user ? <Chatpage/>:<Navigate to="/auth" />}  >  </Route>
        </Routes>
        {user && <LogoutButton/>}
        
        
      </div>
      </main>
  )

}

export default App
