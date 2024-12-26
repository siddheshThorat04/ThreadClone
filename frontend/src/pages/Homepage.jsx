import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { IoHomeOutline } from "react-icons/io5";
import CreatePost from '../components/CreatePost.jsx';

const Homepage = () => {
    const user=useRecoilValue(userAtom)
    return(
    
        <div  className='text-white absolute text-2xl right-40 top-6'  >
            {user && <CreatePost/>}
        </div>
        
    )

}

export default Homepage
