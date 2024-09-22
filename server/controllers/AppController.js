const errorHandler = require("../middlewares/ErrorHandler")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


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

        const token = jwt.sign({ id: user._id , email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "Production",
            }).status(200).json({ message: "Logged in successfully " });
    }
    catch(error){
        return errorHandler(error, res)
    }
}


const logout = async (req, res) => {
    return res.clearCookie("access_token").status(200).json({ message: "Logged out successfully " });
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
        return errorHandler(error, res)
    }
}

const googleAuth = async (req, res) => {
    try {
        const {email, googleId} = req.body
        const checkUserExists  = await User.findOne({email:email})
        if(!checkUserExists){
            const user = new User({
                email,
                googleId
            })
            await user.save()
            checkUserExists = user
        }
        const token = jwt.sign({ id: checkUserExists._id , email: checkUserExists.email}, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "Production",
            }).status(200).json({ message: "Logged in successfully " });    
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const userDetails = async (req, res) => {
    try{
        return res.status(200).json({
            id: req.userId, email: req.userEmail});
    }
    catch(error){
        return errorHandler(error, res)
    }
}

module.exports = {
    health,login,logout,register,userDetails,googleAuth

}