import { text } from "express"
import userModel from "../models/userModel.js"
import Post from "../models/postModel.js"

const createPost = async (req, res) => {
    try {
        const { postedBy, title, description } = req.body
        if (!postedBy || !text) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await userModel.findById(postedBy)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user._id.toString() === req.user.id.toString()) {
            const newPost = new Post({ postedBy, title, description })
            await newPost.save()
            res.status(200).json({ message: user.username, newPost, })
        }
        else {
            res.status(400).json({ message: "UnAuthorized User" })
        }


    } catch (error) {
        res.status(500).json({ message: "Problem creating a post", error: error.message })
    }
}

const getPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "post not found" })
        }

        res.status(200).json({ post })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "post not found" })
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {

            return res.status(401).json({ message: "Not Authorized" })
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ messange: "post deleted" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const linkUnlikePost = async (req, res) => {

    const post = await Post.findById(req.params.id)
    try {
        const { id: postId } = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)
        if (!post) return res.status(404).json({ message: "post Not Found" })
        const userLiked = post.likes.includes(userId)
        if (userLiked) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } })
            res.status(200).json({ message: "post unliked" })
        }
        else {

            await Post.findByIdAndUpdate(postId, { $push: { likes: userId } })
            res.status(200).json({ message: "post liked" })
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log("error liking post")
    }
}

const getFeedPost = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await userModel.findById(userId)
        if (!user) { return res.status(401).json({ message: "User Not Found" }) }

        const following=user.following
       const feedPosts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})
       res.status(200).json({feedPosts})
        


    } catch (error) {
        res.status(400).json({ message:"error in getting"})
        console.log("error getting feed post")
    }
}

export { createPost, getPost, deletePost, linkUnlikePost, getFeedPost }