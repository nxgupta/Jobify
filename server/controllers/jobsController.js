import Job from '../model/Job.js'
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes'
import { badRequestError, notFoundError } from '../errors/index.js'
import { catchAsync } from '../utils/catchAsync.js';
import checkPermissions from '../utils/checkPermissions.js'

const createJob = catchAsync(async (req, res) => {
    const { position, company } = req.body;
    if (!position || !company) {
        throw new badRequestError('Please Provide all values')
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
})

const deleteJob = catchAsync(async (req, res) => {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new notFoundError(`No job with id: ${jobId}`)
    }
    checkPermissions(req.user, job.createdBy)
    await job.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
})

const getAllJobs = catchAsync(async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
})

const updateJob = catchAsync(async (req, res) => {
    const { id: jobId } = req.params
    const { company, position } = req.body
    if (!position || !company) {
        throw new badRequestError('Please Provide all values')
    }
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new notFoundError(`No job found with id: ${jobId}`)
    }
    checkPermissions(req.user, job.createdBy)
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true //It will only validate the values that will in req.body
    })
    res.status(StatusCodes.OK).json({ updatedJob })
})

const showStats = catchAsync(
    async (req, res) => {
    let stats = await Job.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$status', count:{$sum:1}}}
    ]
    )
    stats=stats.reduce((acc,curr)=>{
        acc[curr._id]=curr.count
        return acc;
    },{})
    
    const defaultStats={
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined:stats.declined || 0
    }
    const monthlyApplication=[]
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplication})
}
)
export { createJob, deleteJob, getAllJobs, updateJob, showStats };