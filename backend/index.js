import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js" 
import postRoute from "./routes/post.routes.js"
import messageRoute from "./routes/message.routes.js"
import { app ,server} from "./Socket/socket.js"
import path from 'path'



dotenv.config({})



const PORT = process.env.PORT || 3000

// const _dirname = path.resolve();






//middleware
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));
//yaha par apni api aayengi 
app.use('/api/v1/user',userRoute);
app.use('/api/v1/post',postRoute);
app.use('/api/v1/message',messageRoute);

// app.use(express.static(path.join(_dirname, '/Frontend/dist')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(_dirname, "Frontend" ,"dist" , "index.html"));
// })


server.listen(PORT, () => {
    connectDB();
    console.log(`Listening on ${PORT} `);

})