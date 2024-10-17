import { Router } from 'express';
import * as userController from './user.controller.js';
import expressAsyncHandler from 'express-async-handler';

const router = Router()

router.post('/',  expressAsyncHandler(userController.SignUp))
router.post('/signIn', expressAsyncHandler( userController.signIn))
router.put('/',  expressAsyncHandler(userController.updateAccount))
router.delete('/',  expressAsyncHandler(userController.deleteAccount))
router.get('/:_id',  expressAsyncHandler(userController.getUserData))


export default router 