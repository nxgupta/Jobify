import express from 'express'
let router = express.Router();

import {
    register,
    login,
    updateUser,
    getCurrentUser,
    logOut
} from '../controllers/authController.js'

import { authenticateUser, testUser } from '../middleware/index.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)
router.route('/logOut').get(logOut)

export default router