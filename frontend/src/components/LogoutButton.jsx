
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'

const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom)
    const handleLogout =async  () => {
        try {
            const res= await fetch("/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data= await res.json()
            if(data.error){
                alert(data.error)
                return
            }
            localStorage.removeItem("user-info")
            setUser(null)
            
        } catch (error) {
            console.log("error",error.message)
            
        }
    }
  return (
    <div> 
      <button  onClick={handleLogout} className='text-white mt-5 absolute top-0 right-2  bg-red-500 px-4 py-1 rounded-full  ' >Logout</button>
    </div>
  )
}

export default LogoutButton
