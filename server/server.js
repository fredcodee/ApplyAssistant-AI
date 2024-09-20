require('dotenv').config();
const express = require('express')
const cookieParser = require("cookie-parser");
const cors =  require('cors')
const appRoutes = require('./routes/appRoutes')
const connectToMongoDB = require('./configs/Database')
const bodyParser = require('body-parser');
const allowedOrigins = require('./configs/AllowedOriginUrls')


//connect to db
connectToMongoDB()

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json())

// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: allowedOrigins, credentials: true }));
app.use('/api', appRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;