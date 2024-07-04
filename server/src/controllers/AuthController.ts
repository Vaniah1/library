import { Request, Response } from 'express';
import { register } from '../services/UserService';
import { IUser } from '../models/User';
import { login } from '../services/UserService'
import { InvalidUsernameOrPassword, UnableToSaveUserError } from '../utils/LibraryErrors';
export async function handleRegister(req: Request, res: Response) {
  console.log("Request body:", req.body); // Log the request body to verify it

  const user: IUser = req.body;

  try {
    const registeredUser = await register(user);

    res.status(201).json({
      message: "User Successfully Registered",
      user: {
        _id: registeredUser._id,
        type: registeredUser.type,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
      

    });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error collection")){
      res.status(409).json({message : "User with specifiied Email already exists!!Try using another email address", error:error.message})
    }
    res.status(500).json({ message: "We can't register user at this timer", error:error.message });
  }
}




export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const user = await login(email, password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error: any) {
    if (error instanceof UnableToSaveUserError) {
      res.status(500).json({ message: error.message })
    } else if (error instanceof InvalidUsernameOrPassword) {
      res.status(401).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An error occurred during login', error: error.message })
    }
  }
}


export default { handleRegister, handleLogin };
