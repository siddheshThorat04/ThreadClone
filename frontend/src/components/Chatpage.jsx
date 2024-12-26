import React from 'react'

const Chatpage = () => {
  return (
    <div  className='w-[90vw]  h-[85vh] border-2   absolute  left-[50%]  flex  translate-x-[-50%]     ' >
          <div  className='w-1/3  h-full  border-2 py-5  border-red-200 '  >
              <form  className='w-full justify-center  gap-3  flex  '  >  
                  <input type="text"  className='w-[60%] px-2 py-3 bg-transparent border-[1px] h-8 text-white rounded-lg ' placeholder='search for your friend'   name="search" id="search" />
                  <button type="submit" className='w-[20%]  bg-gray-600 h-8 rounded-lg  text-white tracking-tighter  font-mono'  >Search</button>
               </form>
               {true && [0,1,2,3,4].map((_,i)=>(
                <div className='w-full  flex justify-center'><div className='w-full items-center justify-center border-2 h-10 rounded-2xl   my-1  ' ></div></div>
                  
               ))}
          </div>
          < div   className='border-2 border-green-500  h-full  w-[70%]    '   >

          </div>
    </div>
  )
}

export default Chatpage
