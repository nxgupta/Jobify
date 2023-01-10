import { StatusCodes } from "http-status-codes"
import customApiError from "./custom_api.js"


export default class notFoundError extends customApiError{
    constructor(message){
    super(message)
    this.statusCode=StatusCodes.NOT_FOUND
    }
}