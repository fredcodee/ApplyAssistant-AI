require('dotenv').config();
const express = require('express');
const cors =  require('cors')
const cookieParser = require('cookie-parser')
const connectToMongoDB = require('./configs/Database')
const allowedOrigins = require('./configs/allowedOriginUrls')
const appRoutes = require('./routes/appRoutes')


//connect to db
connectToMongoDB()

const app = express()

// CORS configuration
const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // Allow cookies
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', appRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;