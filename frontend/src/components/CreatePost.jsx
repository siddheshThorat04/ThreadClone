import { useState } from "react"
import CreatePostForm from "../components/CreatePostForm"
const CreatePost = () => {
  const [isClicked, setisClicked] = useState(false);
  return (
    <div>

      <button className='text-white absolute bottom-10 right-2 border-2    border-gray-600 text-4xl px-4  py-1 rounded-full  ' onClick={() => setisClicked(!isClicked)} >+</button>

      { isClicked && <CreatePostForm /> }
    </div>
    )
  }

export default CreatePost
