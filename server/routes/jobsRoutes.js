import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'



import express from 'express'
let router=express.Router();
router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router