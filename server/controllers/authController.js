import { StatusCodes } from "http-status-codes";
import { badRequestError, unAuthenticatedError } from "../errors/index.js";
import User from "../model/User.js"
import { catchAsync } from "../utils/catchAsync.js";
import attachCookies from "../utils/attachCookies.js";


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw new badRequestError('please provide all the values')
        }

        const emailAlreadyExists = await User.findOne({ email })
        if (emailAlreadyExists) {
            throw new badRequestError('Email already exists')
        }

        const user = await User.create({ name, email, password });

        const token=user.createJWT()
        attachCookies({res,token})
        res.status(StatusCodes.CREATED).json({user:{name:user.name,email:user.email,lastName:user.lastName,location:user.location},token,location:user.location})
    }
    catch (err) {
        next(err)
    }
}
const login = async (req, res, next) => {
    try{
    const {email,password}=req.body;
    if(!email || !password){
        throw new badRequestError('Please provide all values')
    }
    //we need to exclusively include select for password
    const user=await User.findOne({email}).select('+password')

    if(!user) {throw new unAuthenticatedError('Invalid credentials')}

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new unAuthenticatedError('Invalid Credentials')
    }

    const token=user.createJWT();
    user.password=undefined
    attachCookies({res,token})
    res.status(StatusCodes.OK).json({user, token, location:user.location})
}
catch(err){
    next(err)
}

}
const updateUser = catchAsync(async (req, res) => {

    const {email,name,lastName,location}=req.body
    if(!email || !name || !lastName || !location){
        throw new badRequestError('Please provide all values')
    }
    
    const user=await User.findOne({_id:req.user.userId});

    user.email=email
    user.name=name
    user.lastName=lastName
    user.location=location

    await user.save();

    const token=user.createJWT();
    attachCookies({res,token})
    res.status(StatusCodes.OK).json({user, token, location:user.location})
})

const getCurrentUser= catchAsync(async (req,res)=>{
     const user = await User.findOne({_id:req.user.userId})
     res.status(StatusCodes.OK).json({user, location: user.location})
})

const logOut=(req,res)=>{
    res.cookie('token','logout',{
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        expires:new Date(Date.now()+1000),
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}

export { register, login, updateUser, getCurrentUser, logOut }