import express from 'express'
let router=express.Router();

import {register, login, updateUser} from '../controllers/authController.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(updateUser)

export default router