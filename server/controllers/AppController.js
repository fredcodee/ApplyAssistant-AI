const User  = require("../models/UserModel.js")
const errorHandler = require("../middlewares/ErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');



const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


//user auth
const login = async (req, res) => {
    try{
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                title: 'bad request',
                message: 'email and password are required'
            })
        }   
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                title: 'unauthorized',
                message: 'email or password is incorrect'
            })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                title: 'unauthorized',
                message: 'email or password is incorrect'
            })
        }   

        const token = jwt.sign({ id: user._id , email: user.email}, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).json({token: token, message: "Logged in successfully " });
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}


const register = async (req, res) => {
    try{
        try {
            const { email, password } = req.body

            const registered = await User.findOne({ email })
            if (registered) {
                return res.status(401).json({ message: 'This email is already registered' });
            }
            const newUser = new User({
                email,
                password: bcrypt.hashSync(password, 10)
            })
            await newUser.save()
            return res.json({ message: 'user is registered successfully' });
        } catch (error) {
            errorHandler.errorHandler(error, res)
        }
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

// google auth
const googleAuth = async (req, res) => {
    try {
        const {email, googleId} = req.body
        let checkUserExists  = await User.findOne({email:email, googleId:googleId})
        if(!checkUserExists){
            const user = new User({
                email,
                googleId
            })
            await user.save()
            checkUserExists = user
        }
        const token = jwt.sign({ id: checkUserExists._id , email: checkUserExists.email}, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).json({ token: token, message: "Logged in successfully " });    
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

// github auth
const githubAuth = async (req, res) => {
    try {
        const { code } = req.body;
        // Exchange code for access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: {
                'Accept': 'application/json',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        if (accessToken) {
            // Get user data and save to db or get user details
            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const userData = userResponse.data;
            if (!userData.id || !userData.email) {
                return res.status(401).json({ message: "Failed to login with github" });
            }
            let user = await User.findOne({ email: userData.email, githubId: userData.id });
            if (!user) {
                const newUser = new User({
                    email: userData.email,
                    githubId: userData.id,
                });
                await newUser.save();
                user = newUser;
            }
            const token = jwt.sign({ id: user._id , email: user.email}, process.env.JWT_SECRET, { expiresIn: '7d' })
            return res.status(200).json({token: token, message: "Logged in successfully " });
        } else {
            return res.status(401).json({ message: "Failed to login with github" });
        }
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const userDetails = async (req, res) => {
    try{
        return res.status(200).json({
            id: req.userId, email: req.userEmail});
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const uploadPdf = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

         //error handling if file is not pdf
         if (!req.file.originalname.match(/\.(pdf)$/)) {
            return res.status(400).send('Please upload a pdf file')
        }

        const dataBuffer = req.file.buffer
        res.status(200).json({
            message: 'PDF parsed successfully',
        });
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}



module.exports = {
    health,login,register,userDetails,googleAuth, githubAuth, uploadPdf
}