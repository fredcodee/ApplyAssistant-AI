const User = require("../models/UserModel.js")
const UserResume = require("../models/UserResume.js")
const UserExperience = require("../models/UserExperience.js")
const JobKits = require("../models/JobKits.js")
const JobDetails = require("../models/JobDetails.js")
const errorHandler = require("../middlewares/ErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require('../controllers/prompts');



const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


//user auth
const login = async (req, res) => {
    try {
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

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).json({ token: token, message: "Logged in successfully " });
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const register = async (req, res) => {
    try {
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
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

// google auth
const googleAuth = async (req, res) => {
    try {
        const { email, googleId } = req.body
        let checkUserExists = await User.findOne({ email: email, googleId: googleId })
        if (!checkUserExists) {
            const user = new User({
                email,
                googleId
            })
            await user.save()
            checkUserExists = user
        }
        const token = jwt.sign({ id: checkUserExists._id, email: checkUserExists.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
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
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            return res.status(200).json({ token: token, message: "Logged in successfully " });
        } else {
            return res.status(401).json({ message: "Failed to login with github" });
        }
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const userDetails = async (req, res) => {
    try {
        return res.status(200).json({
            id: req.userId, email: req.userEmail
        });
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        //error handling if file is not pdf
        if (!req.file.originalname.match(/\.(pdf)$/)) {
            return res.status(400).send('Please upload a pdf file')
        }

        const dataBuffer = await pdfParse(req.file.buffer)

        const text = dataBuffer.text
        let prompt = prompts.promptForExtractingResume


        prompt = prompt + ` and this is the user input: `+text
        const result = await AiGenerator(prompt, false)
        
       
        //for some reason the output comes with ```json so we need to remove it and parse it to json
        let cleanedPrompt = await cleanAiResult(result)

        const newResume = new UserResume({
            userId: req.userId,
            name: cleanedPrompt.name,
            role: cleanedPrompt.roleTitle,
            email: cleanedPrompt.email,
            portfolio: cleanedPrompt.portfolioLink,
            github: cleanedPrompt.githubProfile,
            bio: cleanedPrompt.bio,
            skills: cleanedPrompt.skills,
            education: cleanedPrompt.education[0].degree + " " + cleanedPrompt.education[0].field,
        })
        await newResume.save()

        if(newResume && cleanedPrompt.experience.length > 0){
            for (const experience of cleanedPrompt.experience) {
                const newExperience = new UserExperience({
                    userId: req.userId,
                    UserResumeId: newResume._id,
                    company: experience.companyName,
                    position: experience.position,
                    description: experience.companyDescription,
                    startDate: experience.startyear,
                    endDate: experience.endyear,
                    accomplishments: experience.accomplishments
                })
                await newExperience.save()
            }
        }

        res.status(200).json({
            message: 'PDF parsed successfully and saved to database',
        });
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

//check if user has uploaded resume
const checkResume = async (req, res) => {
    try {
        const getUserResume = await UserResume.findOne({ userId: req.userId })
        if (getUserResume) {
            return res.status(200).json({ message: "User has uploaded resume" })
        }
        else {
            return res.status(401).json({ message: "User has not uploaded resume" })
        }
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

//add job
const addJob = async (req, res) => {
    try {
        const {companyName, companyWebsite, jobLink, jobTitle, jobDescription, salary} = req.body

        const newJob = new JobDetails({
            userId: req.userId,
            companyName,
            companyWebsite,
            jobTitle,
            jobDescription,
            postUrl: jobLink,
            salary
        })
        await newJob.save()
        if (newJob) {
            const userExperience = await UserExperience.find({ userId: req.userId, jobId:null })
            const UserExperiences = userExperience.map((experience) => {
                return `position: ${experience.position}
                companyName: ${experience.company}
                companyDescription: ${experience.description}
                startyear: ${experience.startDate}
                endyear: ${experience.endDate}
                accomplishments: ${experience.accomplishments.map((acc) => acc).join('---')}
                `
            }).join('\n')

            //ai to generate cv letter, message and followup
            let promptForCvMessage = prompts.promptForCvMessage 
            promptForCvMessage = promptForCvMessage + prompts.userInput(jobDescription, UserExperiences)
            const cvMessage = await AiGenerator(promptForCvMessage, newJob._id)
            const cleanPFCM = await cleanAiResult(cvMessage)


            //ai to generate experiences
            let promptForExperiences = prompts.promptForExperienceTailoring
            promptForExperiences = promptForExperiences + prompts.userInput(jobDescription, UserExperiences)
            const experiences = await AiGenerator(promptForExperiences, newJob._id)
            const cleanPFE = await cleanAiResult(experiences)


            //save ai generated cv letter, message and followup 
            const newJobKits = new JobKits({
                userId: req.userId,
                jobId: newJob._id,
                coverLetter: cleanPFCM.cv,
                message: cleanPFCM.message,
                followUpMessage: cleanPFCM.followup
            })
            await newJobKits.save()

            //save ai generated experiences
            if(newJobKits) {
                for (const experience of cleanPFE) {
                    const newExperience = new UserExperience({
                        userId: req.userId,
                        jobId: newJob._id,
                        company: experience.companyName,
                        position: experience.position,
                        description: experience.companyDescription,
                        startDate: experience.startyear,
                        endDate: experience.endyear,
                        accomplishments: experience.accomplishments
                    })
                    await newExperience.save()
                }   
            }    

            return res.status(200).json({
                message: 'Job added successfully and kits generated',
                cv: cleanPFCM.cv,
                dmMessage: cleanPFCM.message,
                followup: cleanPFCM.followup,
                experiences: cleanPFE
            });

        }
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


async function AiGenerator(prompt, jobId) {
    try{
    const genAI = new GoogleGenerativeAI(process.env.AI_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
    }
    catch(error) {
        if (jobId) {
            await JobKits.findOneAndDelete({ userId: req.userId, jobId: jobId })
            await UserExperience.deleteMany({ userId: req.userId, jobId: jobId });
            await JobDetails.findOneAndDelete({ _id: jobId })
        }
    }
}

//for some reason the output comes with ```json so we need to remove it and parse it to json
async function cleanAiResult(result) {
    const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanResult);
}


const getJobs = async (req, res) => {
    try {
        const jobs = await JobDetails.find({ userId: req.userId })
        return res.status(200).json(jobs)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const getJobKits = async (req, res) => {
    try {
        const {jobId} = req.body
        //get resume data for this job
        const userResume = await UserResume.findOne({ userId: req.userId })
        const userExperience = await UserExperience.find({ userId: req.userId, jobId: jobId })
        const jobkits = await JobKits.findOne({ userId: req.userId, jobId: jobId }).populate('jobId')

        //arrange json
        const arrangeResume =  {
            name:userResume.name,
            jobTitle:userResume.role,
            githubLink:userResume.github,
            portfolioLink:userResume.portfolio,
            email:userResume.email,
            themeColor:"#ff6666",
            summary:userResume.bio,
            experience: userExperience.map((experience, index) => ({
                id: index + 1,
                title: experience.position,
                companyName: experience.company,
                type: 'Remote',
                startDate: experience.startDate,
                endDate: experience.endDate,
                currentlyWorking: false,
                workSummary: experience.accomplishments.map((summary) => summary)
            })),
            education:[
                {
                    id:1,
                    education:userResume.education,
                },
            ],
            skills:
                userResume.skills.map((skill) => {
                    return {
                        name:skill
                    }
                }),
            
            companyName: jobkits.jobId.companyName,
            role: jobkits.jobId.jobTitle,
            cv: jobkits.coverLetter,
            dmMessage: jobkits.message,
            followup: jobkits.followUpMessage
        }
        return res.status(200).json(arrangeResume)
    }   
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const editJobProgress = async (req, res) => {
    try {
        const { jobId, progress } = req.body
        const job = await JobDetails.findOne({ _id: jobId })
        job.progress = progress
        await job.save()
        return res.status(200).json({ message: 'Job progress updated successfully' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.body
        await JobKits.findOneAndDelete({ userId: req.userId, jobId: jobId })
        await UserExperience.deleteMany({ userId: req.userId, jobId: jobId });
        await JobDetails.findOneAndDelete({ _id: jobId })
        return res.status(200).json({ message: 'Job deleted successfully' })
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}




module.exports = {
    health, login, register, userDetails, googleAuth, githubAuth, uploadPdf, checkResume, addJob, getJobs, getJobKits, editJobProgress, deleteJob
}