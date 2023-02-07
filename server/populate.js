import dotenv from 'dotenv'
import {readFile} from 'fs/promises'
import { url } from 'inspector'
import {connectDB} from './database/connect.js'
import Job from './model/Job.js'

dotenv.config()

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        Job.deleteMany()
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

