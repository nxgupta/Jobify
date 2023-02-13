import {unAuthenticatedError} from '../errors/index.js'
import jwt from 'jsonwebtoken';
const auth=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        throw new unAuthenticatedError("Authentication Invalid");
    }
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