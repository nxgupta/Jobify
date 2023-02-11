import dotenv from 'dotenv'
import {readFile} from 'fs/promises'
import mongoose from 'mongoose'
import {connectDB} from './database/connect.js'
import Job from './model/Job.js'

dotenv.config()

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        Job.deleteMany({createdBy: mongoose.Types.ObjectId('63e1f7b626c2af9c97040bb9')})
        const jsonJobs=JSON.parse(
            await readFile(new URL('./mock_data.json', import.meta.url))
            )
        await Job.create(jsonJobs);
        console.log('Success!!!')
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }

}

start()

