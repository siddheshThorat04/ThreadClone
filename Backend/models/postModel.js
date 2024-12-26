import mongoose, { mongo } from "mongoose"

const postSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    description: {
        type: String,

    },
    title: {
        type: String,
    },
    img: {
        type: String
    },
    likes: {
        type:[ mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    replies: [{
        username:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
    }]
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)
export default Post