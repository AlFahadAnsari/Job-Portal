import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDb from "./utils/db.js"
dotenv.config({})

const Port = 8080
const app = express()

app.get("/home",(req,res)=>{
    res.send("hii alfahad")
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin:"http//localhost/5173",
    credentials:true
}
app.use(cors(corsOptions))




app.listen(Port ,()=>{
    ConnectDb()
    console.log(`server runing on ${Port}`)
})