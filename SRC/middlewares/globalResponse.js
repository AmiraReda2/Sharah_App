 // send json response after controller file

 export const globalResponse = (error, req ,res, next) =>{
   
    if(error){
        return res.status(500).json({
            messgae:'Catch Error',
            errorMessage:error.messgae,
            errorLocation: error.stack
        })
    }
 }