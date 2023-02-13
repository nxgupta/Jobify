import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'//express
import express from 'express'
import cookieParser from 'cookie-parser'
const app=express()

//dotenv
import dotenv from 'dotenv'
dotenv.config()

//cookie-parser
app.use(cookieParser())

//morgon
import morgan from 'morgan'
if(process.env.NODE_ENV!=='production'){
    app.use(morgan('dev'))
}

//cors
import cors from 'cors'
app.use(cors({
    origin: true,
    credentials: true,
  }))

//routes
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//connecting to db
import { connectDB } from './database/connect.js';

// middleWares
import {notFoundMiddleware,errorHandlerMiddleware} from './middleware/index.js';

//configuring port
const port=process.env.PORT || 5000;

//body in json
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
    message:'Too many requests from this IP Address, Please try again after 10 minutes'

})
app.use(limiter)


//in order to authenticate user, for jobs
import authenticateUser from './middleware/Auth.js'

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)

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