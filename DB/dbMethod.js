

// ======================  find Document ======================//
/**
 * model
 * condition
 */



export const findDocument = async (model , query) => {

    if (!model || !query) return {messgae:'Invalid Argumenmtes', status:400 , success: false}

    const isDocumentExist = await model.findOne(query)
    if(!isDocumentExist) return { message:"document not found ", status:404 , success:false}
    
    return {messagae:"documemt found ", isDocumentExist , success:true}
}

export const createDocument = async(model , data)=>{
    if(!model || !data) return {message:'Invalid Argumenmts' , status:400 , success:false}

    const createdDocument = await model.create(data)

    if(!createdDocument) return {message:"Document Not Created ", status:400 , success:false }

    return {messagae:"documemt created success ", createDocument, success:true , status:201}
}