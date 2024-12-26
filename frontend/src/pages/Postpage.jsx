import React from 'react'
import Userpost from '../components/Userpost'

const Postpage = () => {
  return (
    <div>
      <Userpost likes={1000} replies={500} postTitle="Heyy This is my first post. "   postImage="https://picsum.photos/seed/picsum/900/400" />
      <Userpost  likes={1230} replies={99} postTitle="Lets Talk abbout thread."  postImage="https://picsum.photos/id/237/200/300"/>
      <Userpost   likes={32000} replies={3200} postTitle="I am mark. "  postImage="https://picsum.photos/id/238/200/300" />
      <Userpost   likes={1324000} replies={900} postTitle="Heyy Hello !! "  postImage="https://picsum.photos/id/239/200/300" />
    </div>
  )
}

export default Postpage
