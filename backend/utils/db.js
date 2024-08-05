import mongoose from "mongoose";

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    } catch (error) {
        console.log("your error is " + error)
    }
}

export default ConnectDb