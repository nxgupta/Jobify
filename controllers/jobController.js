import {StatusCodes} from "http-status-codes"
import jobModel from "../models/jobSchema.js"

export const getAllJobs = async (req, res) => {
  let jobs = await jobModel.find({})
  res.status(StatusCodes.OK).json({jobs})
}

export const createJob = async (req, res) => {
  const {company, position} = req.body

  if (!company || !position) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide company and position"})
  }
  let job = await jobModel.create({company, position})
  res.status(StatusCodes.CREATED).json({job})
}

export const getJob = async (req, res) => {
  const {id} = req.params
  const job = await jobModel.findById(id)
  if (!job) {
    return res.status(404).json({msg: `no job with id ${id}`})
  }
  res.status(StatusCodes.OK).json({job})
}

export const updateJob = async (req, res) => {
  const {id} = req.params

  const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedJob) {
    return res.status(404).json({msg: `no job with id ${id}`})
  }

  res.status(StatusCodes.OK).json({job: updatedJob})
}

export const deleteJob = async (req, res) => {
  const {id} = req.params
  const removedJob = await jobModel.findByIdAndDelete(id)

  if (!removedJob) {
    return res.status(404).json({msg: `no job with id ${id}`})
  }
  res.status(StatusCodes.OK).json({job: removedJob})
}
