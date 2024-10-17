import bcrypt from 'bcryptjs';

import User from './../../../DB/models/user.model.js';
import { getReasonPhrase, getStatusCode, StatusCodes } from 'http-status-codes';


//!  ========================== SignUp ===========================//
export const SignUp = async(req ,res ,next)=>{
    const {username , email , password} = req.body 
    // username check 
    const isUserNameDuplicate = await User.findOne({username})
    if(isUserNameDuplicate){
        return res.status(409).json({message :'username is already exist '})
    }

    // email check 
    const isEmailDuplicate = await User.findOne({email})
    if(isEmailDuplicate){
        return res.status(409 ).json({message :'email is already exist '})
    }

    // hash password
    // salt rounds => 9 
    const hsahedPassword = bcrypt.hashSync(password , +process.env.SALT_ROUNDS )
    // console.log({ hsahedPassword})

    const createdUser = await User.create({username , email , password: hsahedPassword})
     if(!createdUser){
        return res.status(500).json({message:'User registrarion failed'}
        )
     }
     return res.status(201).json({message:'User registrarion success',createdUser})
}


//! ======================== signIn Api ================================//
export const signIn =async(req ,res ,next) =>{

    const {username , email ,password } = req.body
    //username or email
    const user = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.json({message:'Invalid login credentials', status: 400})
    }
    // passwored
    // boolean
    const isPasswordMatch = bcrypt.compareSync(password , user.password)
     console.log(isPasswordMatch)
     if(!isPasswordMatch){
        return res.json({message:'Invalid login credentials', status: 400})
     }

     return res.json({message:'Login success', status: 200})
}


//! ====================== update ===========================//
export const updateAccount  = async (req,res,next)=>{
    const {username , email} = req.body;
    const {_id,loggedInId} = req.query ;

    //*============== authorized check =============
    if(_id.toString() === loggedInId){
        return res.json({
            message : "You are not authorized to perform this action" ,
            status:401
        })
     }

    let updateObject ={};
    //* username is not exists 
    if(username){
        const isUserNameDuplicate = await User.findOne({username});
        if(isUserNameDuplicate){
            return res.json({message:"username is already exsit",status:400})
        }
        updateObject.username = username;
    }
   //* email is not exsits
   if(email){
    const isEmailDuplicate = await User.findOne({email});
    if(isEmailDuplicate){
        return res.json({message:"email is already exsit",status:400})
    }
    updateObject.email = email;
}

console.log(updateObject);
// username , email
const updateuser = await User.updateOne({_id},updateObject);

if (!updateuser.modifiedCount){
    return res.json({data:updateuser,message:"No data to be updated", status:400})
}
return res.json({data:updateuser,message:'Update Successfully', status:200})
}

// ! ==================== delete user ==================//
export const deleteAccount =async (req ,res,next)=>{
    const {_id , loggedInId} = req.query 
    // way one
    // const user = await User.findOneAndDelete({
    //     _id: loggedInId
    // })
    // if(!user){
    //     return res.json({message:'deleted fail' , status:400})
    // }
    // return res.json({
    //     message:'deleted success',
    //     status:200
    // })

    //*way two
    if(_id !== loggedInId){
        return res.json({
            message:"deleted fail-Unauthorized",
            status:400
        })
    }
   const user = await User.findByIdAndDelete(_id)  
   if(!user){
    return res.json({messgae:"Invalid Id ", status:400})
   }
   return res.json({
      message:'deleted success',
      status:200
 })
        
    
}

//! =================== get user data =====================//
export const getUserData = async (req ,res ,next )=>{
   try{
    const {_id} = req.params
    const user = await User.findById(_id ,'username')
    if(!user){
        return res.json({
            message:"Invalid userId ",
            status:400
        }) 
    } return res.json({
        message:"Done",
        user
    })
   }catch(error){
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:"catch error",
        errorMasg:error,
        error:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        getCode:getStatusCode('Internal Server Error')
     })
   }
}