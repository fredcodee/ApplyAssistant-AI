import dotenv from 'dotenv';
dotenv.config();


const allowedOrigins = [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD,
]

export default allowedOrigins;