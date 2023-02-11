import {unAuthenticatedError} from '../errors/index.js'
import jwt from 'jsonwebtoken';
const auth=(req,res,next)=>{

    console.log(req.cookies.token, 'cookie')
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new unAuthenticatedError("Authentication Invalid");
    }
    const token=authHeader.split(" ")[1];
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        const testUser=payload.userId==='63e1f7b626c2af9c97040bb9'
        req.user = {userId:payload.userId,testUser}
        next();
    }
    catch(error){
        throw new unAuthenticatedError('Authentication Invalid');
    }   
}
export default auth;