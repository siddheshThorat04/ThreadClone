
import jwt from "jsonwebtoken"
const TokenAndCookieSet = (userId,res)=>{
    const token=jwt.sign({userId:userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    } )

    
    res.cookie("userCookie",token,{
        httpOnly:true,// this cookie cannot be accesed by the browser
        sameSite:"strict" // CSRF 
    })


    return token;
}
export default TokenAndCookieSet