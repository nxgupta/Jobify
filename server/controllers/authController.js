import { StatusCodes } from "http-status-codes";
import { badRequestError } from "../errors/index.js";
import User from "../model/User.js"


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw new badRequestError('please provide all the values')
        }
        const emailAlreadyExists = await User.findOne({ email })
        console.log(email,emailAlreadyExists)
        if (emailAlreadyExists) {
            throw new badRequestError('Email already exists')
        }
        const user = await User.create({ name, email, password });
        res.status(StatusCodes.CREATED).json(user)
    }
    catch (err) {
        next(err)
    }
}
const login = async (req, res) => {
    res.send('login user')
}
const updateUser = async (req, res) => {
    res.send('updateUser')
}

export { register, login, updateUser }