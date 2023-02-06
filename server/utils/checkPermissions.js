import { unAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser,resourceUserId) => {
  if(requestUser.role==='Admin') return
  if(requestUser.userId!==resourceUserId.toString()){
    throw new unAuthenticatedError('You are not allowed to access this route')
  }
  return
}

export default checkPermissions
