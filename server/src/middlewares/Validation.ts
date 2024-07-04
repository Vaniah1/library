import Joi,{ObjectSchema} from "joi"

import { NextFunction,Response,Request } from "express"
import {IUser} from "../models/User"
import { IUserModel } from "../daos/UserDao"
  export function ValidateSchema(schema:ObjectSchema,property:string){
      return async (req:Request, res:Response,next:NextFunction) =>{
          try {
              switch(property){
                case "query":
                    await schema.validateAsync(req.query)
                    break
                case "params":
                    await schema.validateAsync(req.params)
                    break
                default:
                    await schema.validateAsync(req.body)
              }
              next()
          } catch (error:any) {
              if (error.details[0].path.includes('email')) {
                  return res.status(422).json({message: "Invalid email format"})
              } else if (error.details[0].path.includes('password')) {
                  return res.status(422).json({message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character"})
              } else {
                  return res.status(422).json({message: "Object Validation Failed, please include a valid object!!"})
              }
          }
      }
  }

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().regex(/^[\w.%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/),
            password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        }),
        login: Joi.object({
            email: Joi.string().required().regex(/^[\w.%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/),
            password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        }),

        userId: Joi.object<{userId:string}>({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: Joi.object<IUserModel>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/^[\w.%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/).required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        })
    }
}