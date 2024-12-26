import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectdDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
const app = express()

dotenv.config() // this should be above connenctDb beacause we're using env data in connectDb 
connectDb()
const PORT = process.env.PORT || 5000


app.use(express.json()) //to parse th ejson data in request body
app.use(express.urlencoded({extended:true}))//to parse form data from req.body
app.use(cookieParser())

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)




app.get("/",(req,res) => {
  res.send("Heyy This is home page ")
}
)



app.listen(PORT, () => {
  console.log(`Server  connected now at ${PORT}✅`)
}
)