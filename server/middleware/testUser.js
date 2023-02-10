import { badRequestError } from "../errors/index.js"

const testUser = (req,res,next) => {
  if(req.user.testUser){
    throw new badRequestError('Test User, Read Only')
  }
  next();
}
export default testUser