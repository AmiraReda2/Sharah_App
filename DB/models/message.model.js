import { model ,Schema } from "mongoose";


 const messageSchema = new Schema({
   contant:{
     type:String,
     required: true
   },
   sendTo:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required: true 
   },
   isViewed:{
    type: Boolean,
    default: false
   }

},{timestamps: true})

const Messages = model('Message', messageSchema)
export default Messages