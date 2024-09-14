import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js" 
import postRoute from "./routes/post.routes.js"
import messageRoute from "./routes/message.routes.js"
import { app ,server} from "./Socket/socket.js"

dotenv.config({})



const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    return res.status(200).json
        ({ 
            message: 'Welcome ',
            success: true
        })
})


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


server.listen(PORT, () => {
    connectDB();
    console.log(`Listening on ${PORT} `);

})