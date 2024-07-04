import {Request,Response} from "express"
import {findAllUsers, findUserById, removeUser,modifyUser} from "../services/UserService"
import { UserDoesNotExistError } from "../utils/LibraryErrors"

async function getAllUsers(req:Request,res:Response) {
    try {
        let users = await findAllUsers()
        res.status(200).json({message:"Users retrieved successfuly", users})
    } catch (error:any) {
        res.status(500).json({message:"Unable to retrieve users at this time", error:error.message})
    }
}


async function deleteUser(req:Request,res:Response) {
try {
const userId = req.params.userId
const result = await removeUser(userId)
res.status(202).json({message:"User Deleted Successfuly", result})
} catch (error:any) {
    if (error instanceof UserDoesNotExistError){
    res.status(404).json({message:"User not found!!"})
    
} else {
    res.status(500).json({message:"Unable to delete user", error:error.message})
}

}
}

async function updateUser(req:Request,res:Response) {
try {
const user = req.body
const updatedUser = await modifyUser(user)
res.status(200).json({message: "User updated successfully", user: updatedUser})
} catch (error:any) {
    if (error instanceof UserDoesNotExistError){
        res.status(404).json({message:"User not found!!"})
    }else {
        res.status(500).json({message:"Unable to update user", error:error.message})
    }

}
}

async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.userId
    const user = await findUserById(userId)
    res.status(200).json({ message: "User retrieved successfully", user })   
  } catch (error: any) {
    if (error instanceof UserDoesNotExistError){
        res.status(404).json({message:"User not found!!"})
    } else{
        res.status(500).json({ message: "Unable to retrieve user", error: error.message })
    }
    
  }
}

export default {getUserById, updateUser, deleteUser, getAllUsers }