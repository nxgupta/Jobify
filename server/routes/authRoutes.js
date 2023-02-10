import express from 'express'
let router=express.Router();

import {register, login, updateUser} from '../controllers/authController.js'

import {authenticateUser, testUser} from '../middleware/index.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)

export default router