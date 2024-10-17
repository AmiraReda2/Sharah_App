
import { createDocument, findDocument } from '../../../DB/dbMethod.js';
import Messages from '../../../DB/models/message.model.js';
import User from './../../../DB/models/user.model.js';


//! ====================== send message ======================//
export const sendMasg =  async(req, res, next) =>{
        const {  contant } = req.body
        const { sendTo } = req.params
    
        const isUserExist = await findDocument(User , {_id: sendTo})
        if(!isUserExist.success) return res.status(isUserExist.status).json({message:isUserExist.message})
    
    
        const createdDocument = await createDocument(Messages, { contant , sendTo})
        if(!createdDocument.success) return res.status(createdDocument.status).json({message:createdDocument.message})
    
        res.status(201).json({ message: "Message Ceration Success"})    
    } 


//! ================== delete message =====================//
export const deleteMessage = async(req, res, next)=>{

    const {loggedInUserId , messageId} = req.query  

    const deleteMessage = await Messages.findByIdAndDelete({_id:messageId ,sendTo: loggedInUserId})

    if(!deleteMessage) return res.status(400).json({message:"Con't Delete This Message",})

        res.status(200).json({message:"Deleted Success"})
}


//!================= mark message as viewed =============//

export const markMessageAsRead = async (req, res ,next) =>{

    const {loggedInUserId , messageId} = req.query 

    const updatedMessage = await Messages.findByIdAndUpdate(
        {_id: messageId , sendTo:loggedInUserId , isViewed:false},
        {isViewed:true , $inc:{__v: 1}},
        {new: true}
    )
    if(!updatedMessage) return next(new Error('Updated Fail', {cause:400}))
    res.status(200).json({message:"Updated Done",updatedMessage})
 
}

// ! ========================= list user message =================//

export const listUserMessage = async(req , res ,next) =>{

    const {loggedInUserId , isViewed} = req.query

    const messages = await Messages
    .find({sendTo:loggedInUserId , isViewed})
    .sort({ createdAt: -1 })
    
   if(!messages.length) return res.status(200).json({message:'No Result'})
   res.status(200).json({message:'Your Messages:', messages})

}