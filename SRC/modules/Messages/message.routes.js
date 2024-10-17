import {Router} from 'express';
import * as messageController from './message.controller.js';
import expressAsyncHandler from 'express-async-handler';

const router = Router()

router.post('/:sendTo',expressAsyncHandler( messageController.sendMasg))
router.delete('/', expressAsyncHandler(messageController.deleteMessage))
router.put('/', expressAsyncHandler(messageController.markMessageAsRead))
router.get('/', expressAsyncHandler(messageController.listUserMessage))


export default router