import { StatusCodes } from "http-status-codes";
import { badRequestError, unAuthenticatedError } from "../errors/index.js";
import User from "../model/User.js"


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

        res.status(StatusCodes.CREATED).json({user:{name:user.name,email:user.email,location:user.location},token,location:user.location})
    }
    catch (err) {
        next(err)
    }
}
const login = async (req, res,next) => {

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
    res.status(StatusCodes.OK).json({user, token, location:user.location})
}
catch(err){
    next(err)
}

}
const updateUser = async (req, res) => {
    console.log(req.user)
    res.send('updateUser')
}

export { register, login, updateUser }