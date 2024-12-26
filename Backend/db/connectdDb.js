import mongoose from "mongoose";


const connectDb=()=>{
    try{
    const dbPort=process.env.MONGO_URI
    mongoose.connect(dbPort)
    console.log("Database Conncted 😉")
    }catch(err){
        console.error(`Problem Connnectin DB due to: ${err} `)
        process.exit(1)

    }
    
}


export default connectDb 