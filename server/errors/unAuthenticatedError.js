import CustomApiError from './custom_api.js'
import { StatusCodes } from 'http-status-codes'

export default class unAuthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED;
    }
}
