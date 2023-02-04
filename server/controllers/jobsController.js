import Job from '../model/Job.js'
import {StatusCodes} from 'http-status-codes'
import {badRequestError, notFoundError} from '../errors/index.js'


const createJob=async (req,res)=>{
    const {position,company}=req.body;
    if(!position || !company){
        throw new badRequestError('')
    }
}
const deleteJob=async (req,res)=>{
    res.send('delete job')
}
const getAllJobs=async (req,res)=>{
    res.send('get all job')
}
const updateJob=async (req,res)=>{
    res.send('update job')
}
const showStats=async (req,res)=>{
    res.send('show stats')
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats };