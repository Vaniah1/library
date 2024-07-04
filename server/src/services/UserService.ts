import bcrypt from "bcrypt";
import { config } from "../config";
import UserDao, { IUserModel } from "../daos/UserDao";
import { IUser } from "../models/User";
import { UnableToSaveUserError,InvalidUsernameOrPassword,UserDoesNotExistError } from "../utils/LibraryErrors";

export async function register(user: IUser): Promise<IUserModel> {
  const ROUNDS = config.server.rounds;

  console.log("Hashing rounds:", ROUNDS);
  console.log("User password:", user.password); // Ensure password is present and valid

  try {
    // Validate password presence and type
    if (!user.password || typeof user.password !== 'string') {
      throw new Error("Invalid password");
    }

    // Check if user already exists
    const existingUser = await UserDao.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

    // Save user to database
    const newUser = new UserDao({ ...user, password: hashedPassword });
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    throw new UnableToSaveUserError(error.message)
  }
}

export async function login(email: string, password: string): Promise<IUserModel> {
try {
// Find user by email
const user = await UserDao.findOne({ email })
if (!user) {
throw new InvalidUsernameOrPassword("User does not exists")
}

// Compare password
const isPasswordValid = await bcrypt.compare(password, user.password)
if (!isPasswordValid) {
throw new InvalidUsernameOrPassword("Invalid password")
}

return user
} catch (error: any) {
throw new error
}
}


export async function findAllUsers(): Promise<IUserModel[]> {
  try {
    const users = await UserDao.find();
    return users;
  } catch (error:any) {
    throw new Error(error.message);
  }
}

  export async function findUserById(userId: string): Promise<IUserModel | undefined> {
  try {
    const user = await UserDao.findById(userId)
    if (user) return user
    throw new UserDoesNotExistError("User Does not exist!")

    return undefined
  } catch (error: any) {
    throw error
  }
}


export async function modifyUser (user:IUserModel):Promise<IUserModel>{
  try{
    let id =  await UserDao.findByIdAndUpdate(user._id,user,{new:true})
    if(!id) throw new UserDoesNotExistError("User Does not exist!!")
    return user
  }catch(error:any){
    throw error
  }
}

export async function removeUser (userId:string):Promise<string>{
  try{
    let deleted = await UserDao.findByIdAndDelete(userId)
    if(!deleted) throw new UserDoesNotExistError("User Does not exist!!")
    return "User Deleted Successfully"
  }catch(error:any){
    throw error
  }
}

