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
// CORS configuration
const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // Allow cookies
  };

app.use(cors(corsOptions));
app.use(json())
app.use(cookieParser());
app.use('/api', appRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

export default app;