import express from 'express'
const app=express()

import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'

//import "express-async-errors"
import {StatusCodes} from "http-status-codes"

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//connecting to db
import { connectDB } from './database/connect.js';

// middleWares
import {notFoundMiddleware,errorHandlerMiddleware} from './middleware/index.js';

//configuring port
const port=process.env.PORT || 5000;

//CORS
app.use(cors())

//body in json
app.use(express.json())

//setting home route
app.get('/',(req,res)=>{
    res.send('welcome!')
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',jobsRouter)



//handling route errors
app.use(notFoundMiddleware)

//handling errors caused by the missing resources/server error
app.use(errorHandlerMiddleware)

let start=async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    }
    catch(err){
        console.log('Failed to connect to db, Error: ',err)
    }
}
start()