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
        const result = await AiGenerator(prompt)
        
       
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
            const cvMessage = await AiGenerator(promptForCvMessage)
            const cleanPFCM = await cleanAiResult(cvMessage)


            //ai to generate experiences
            let promptForExperiences = prompts.promptForExperienceTailoring
            promptForExperiences = promptForExperiences + prompts.userInput(jobDescription, UserExperiences)
            const experiences = await AiGenerator(promptForExperiences)
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


async function AiGenerator(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.AI_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

//for some reason the output comes with ```json so we need to remove it and parse it to json
async function cleanAiResult(result) {
    const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanResult);
}


const testAi = async (req, res) => {
    try {
        const prompt = ```json
        {
        "name": "WILFRED CHUKWU",
        "roleTitle": "BACKEND DEVELOPER",
        "email": "Wilfredchukwu1@gmail.com",
        "portfolioLink": "https://thefredcode.com",
        "githubProfile": "https://github.com/fredcodee",
        "bio": "Backend developer with over 8 years of experience.",
        "skills": [
            "NodeJs",
            "Django",
            "ReactJs",
            "Flask",
            "MongoDb",
            "Postgress",
            "SQLAlchemy",
            "HTML/CSS",
            "Docker",
            "Aws",
            "Git"
        ],
        "education": [
            {
            "degree": "BS",
            "field": "COMPUTER SCIENCE"
            }
        ],
        "experience": [
            {
            "position": "SOFTWARE ENGINEER (REMOTE)",
            "companyName": "INVIX",
            "companyDescription": "Ai Start-up company focused on building infrastructure, optimization, and design.",
            "startyear": "2022",
            "endyear": "2024",
            "accomplishments": [
                "Refined Backend Development through Collaboration: Collaborated with senior developers to implement best practices and advanced techniques, enhancing backend efficiency. This contributed to faster feature delivery, strengthening INVIX’s market competitiveness.",
                "Developed AI-Powered Construction Defect Detection App: Designed and implemented API and backend systems for an AI-driven application identifying defects in building construction. Focused on data storage, manipulation, and user management, leading to 95% accuracy in defect detection. This helped attract major clients and drove a 25% revenue increase.",
                "Designed Scalable Database Architecture: Engineered and maintained MongoDB-based database architecture to optimize data storage and retrieval. Reduced downtime and errors by 35%, improving user experience and reinforcing INVIX’s reputation for high-performance solutions.",
                "Collaborated in International Teams: Effectively worked with international teams across time zones, ensuring smooth communication and project alignment. This contributed to timely project completions and allowed INVIX to meet critical deadlines."
            ]
            },
            {
            "position": "SOFTWARE ENGINEER (REMOTE)",
            "companyName": "TARGETHUNT",
            "companyDescription": "Data extraction company",
            "startyear": "2019",
            "endyear": "2022",
            "accomplishments": [
                "Optimized Data Processing Efficiency: Designed and implemented efficient data processing algorithms, reducing memory usage and processing time. This allowed TargetHunt to scale operations without extra infrastructure costs, increasing data extraction capacity and driving a 20% boost in client acquisition and retention.",
                "Developed Scalable API Services: Collaborated with developers to build reliable API services using Django Rest Framework, forming the core of our data extraction platform. This improved system reliability and minimized downtime.",
                "Automated Web Scraping and Browser Operations: Led the development of browser automation with Selenium, integrating it into backend systems. This reduced manual effort, sped up data collection, and expanded data source variety, allowing TargetHunt to enter new markets and boost revenue streams."
            ]
            },
            {
            "position": "BACKEND DEVELOPER",
            "companyName": "VINNTECH",
            "companyDescription": "SAAS Company in the finance",
            "startyear": "2017",
            "endyear": "2019",
            "accomplishments": [
                "Refined Backend Code for Developer Efficiency: Maintained and refactored the backend codebase, creating a more organized structure that improved frontend developer workflow. This reduced time-to-market for new features, enabling VinnTech to adapt faster to market changes.",
                "Integrated Secure Stripe Payment System: Collaborated on designing and implementing secure Stripe payment integration, resulting in a 25% rise in successful transactions and higher subscription renewals. This process reinforced VinnTech’s revenue model by ensuring consistent cash flow.",
                "Delivered User-focused Solutions on Time: Implemented product enhancements based on user feedback, ensuring timely delivery without sacrificing quality. This increased user satisfaction, leading to a 20% rise in engagement and reduced churn."
            ]
            }
        ]
        }
        ```
        // convert to json
        // Removing the ```json markers
        const cleanedPrompt = prompt.replace(/```json/g, '').replace(/```/g, '').trim();
        console.log(cleanedPrompt)
        // const changed= JSON.parse(cleanedPrompt)
        // console.log(changed)
    }
    catch (error) {
        errorHandler.errorHandler(error, res)
    }
}



module.exports = {
    health, login, register, userDetails, googleAuth, githubAuth, uploadPdf, checkResume, addJob, testAi
}