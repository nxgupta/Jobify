import { StatusCodes } from "http-status-codes"
import customApiError from "./custom_api.js"


export default class badRequestError extends customApiError{
    constructor(message){
    super(message)
    this.statusCode=StatusCodes.BAD_REQUEST
    }
}