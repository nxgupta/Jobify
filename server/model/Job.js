import mongoose from 'mongoose';
import User from './User.js';
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        maxlength: 100,
        required:[true, 'Please provide company']
    },
    position: {
        type: String,
        maxlength: 50,
        required:[true, 'Please provide position']
    },
    jobLocation: {
        type: String,
        maxlength: 50,
        default:'my city',
        required:[true, 'Please provide location']
    },
    status: {
        type: String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    jobType: {
        type: String,
        enum:['full-time','part-time','remote','internship'],
        default:'full-time'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
},{
    timestamps:true,
    versionKey:false
}
)
export default mongoose.model('Job',JobSchema)