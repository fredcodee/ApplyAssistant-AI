import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    googleId: {
        default: null,
        type:String
    },
    password: String,
    email:{
       type:String
    },
    githubId: {
        default: null,
        type:String
    }
});

export default model('User', userSchema);