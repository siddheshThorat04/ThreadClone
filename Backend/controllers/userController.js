
import bcrypt from "bcryptjs"
import TokenAndCookieSet from "../utils/helpers/TokenAndCookieSet.js";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"


const getUserProfile = async (req, res) => {
    const {username}=req.params
    try {
        const user=await userModel.findOne({username}).select("-password").select("-updatedAt").select("-email")
        if(!user)return res.status(401).json({error:"User not found"})

        res.status(200).json({user})


    } catch (error) {
        res.status(400).json({error:error.message})
        console.log("problem fetching the profile")
        
    }
}
const signUp = async (req, res) => {


    try {
        const { name, email, username, password } = req.body;
        const user = await userModel.findOne({ $or: [{ email }, { username }] })
        if (user) {
            return res.status(400).json({ error: "User Already Exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hasshedPassword = await bcrypt.hash(password, salt)
        const newUser = await userModel.create({ name, email, username, password: hasshedPassword })
        await newUser.save()
        if (newUser) {
            TokenAndCookieSet(newUser._id, res)
            res.status(200).send(newUser)
        } else {
            res.status(400).json({ message: "Invalid User Data" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.error("error message is :", error.message)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const user = await userModel.findOne({ username })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                TokenAndCookieSet(user._id, res)
                res.status(200).send(user)
            } else {
                res.status(400).json({ error: "Invalid Credentials" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" })
        }
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}


const logout = async (req, res) => {

    try {
        res.cookie("userCookie", "", { maxAge: 1 })
        res.status(200).json({ message: "Logged Out" })
    } catch (error) {

    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const userToModify = await userModel.findById(id)

        const currentUser = await userModel.findById(req.user._id)
        if (id === req.user._id.toString()) return res.status(400).json({ error: "you cannot follow yourself" })
        if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found" })
        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            // unfollow the user
            // currentUser chya following list madhun userToModify pull karnar
            // userToModify chya followers list madhun currentUser pull karnar
            await userModel.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            await userModel.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })

            res.status(200).json({ message: "User Unfollowed" })
        } else {
            // follow the user
            // currentUser chya following list madhe userToModify push karnar
            // userToModify chya followers list madhe currentUser push karnar
            await userModel.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            await userModel.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            res.status(200).json({ message: "User Followed" })
        }
    } catch (error) {
        res.status(401).json({ error: error.message })
        console.error("Error in following user ")
    }

}

const updateUser = async (req, res) => {

    const { name, email, username, password } = req.body
    const userId = req.user._id
  
    try {
        let user = await userModel.findById(userId)
        if(req.params.id!==userId.toString()) return res.status(403).json({error:"You can update only your account"})
        if(!user) return res.status(404).json({error:"User not found"})
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hasshedPassword = await bcrypt.hash(password, salt)
            user.password = hasshedPassword
        }
        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        
        await user.save()

        res.status(200).json({ message: "User Updated",user })

    } catch (error) {
        res.status(500).json({ message:"here we are",error:error.message })
        console.log("error updating the user ")
    }
}
export { signUp, login, logout, followUnfollowUser, updateUser,getUserProfile }