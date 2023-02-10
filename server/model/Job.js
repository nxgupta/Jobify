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
        enum:['Interview','Declined','Pending'],
        default:'Pending'
    },
    jobType: {
        type: String,
        enum:['Full-Time', 'Part-Time', 'Remote', 'Internship'],
        default:'Full-Time'
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