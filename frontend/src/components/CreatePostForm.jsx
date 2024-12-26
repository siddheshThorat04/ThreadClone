import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const CreatePostForm = () => {
    const user=useRecoilValue(userAtom)
    console.log(user._id)
    const handleCreatePost=async()=>{
        const res=await fetch("/api/posts/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:document.getElementById("title").value,
                description:document.getElementById("description").value,
                postedBy: user._id,
            }),


        })
        const data=res.json()
        if(data.error){
            alert(data.error)
            return
        }
        console.log(data)


    }
 
  return (
    <div  className='h-[50vh] mt-5  text-white '  onSubmit={handleCreatePost}  >
         <form  className='flex flex-col  py-4  gap-3 w-1/2 mx-auto'  >
            <input type="text" name="title" id="title" placeholder='Title'  className='px-2 py-2 rounded-xl bg-gray-700'  />
            <input type="text" name="description" id="description" placeholder='Description'  className='px-2 py-2 rounded-xl bg-gray-700'  />
            <button type='submit'>Create Post</button>
         </form>
    </div>
  )
}

export default CreatePostForm
