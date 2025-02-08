import { validationResult } from "express-validator"

export const validateErrors = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}

export const validateErrorsWithoutFikes = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({success:false, message:'Error with Validation', errors:errors.errors})
    }
    next()
}