import dotenv from 'dotenv'
dotenv.config()
import express, { json } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import appRoutes from './routes/appRoutes.js';
import connectToMongoDB from './configs/Database.js';
import allowedOrigins from './configs/AllowedOriginUrls.js';


//connect to db
connectToMongoDB()

const app = express()
app.use(cookieParser());
app.use(json())

// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: allowedOrigins, credentials: true }));
app.use('/api', appRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

export default app;