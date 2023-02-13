import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import { connectDB } from './database/connect.js';
import {notFoundMiddleware,errorHandlerMiddleware} from './middleware/index.js';
import authenticateUser from './middleware/Auth.js'

dotenv.config()
const app=express()
if(process.env.NODE_ENV!=='production'){
    app.use(morgan('dev'))
}
const port=process.env.PORT || 5000;
app.use(cors({
    origin:['https://trackapplications.netlify.app','https://trackapplications.netlify.app/'],
    credentials:true,
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(xss())
app.use(mongoSanitize())
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
    message:'Too many requests from this IP Address, Please try again after 10 minutes'

})
app.use(limiter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)
app.set('trust proxy', 1)

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