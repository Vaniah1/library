export type User = {
    _id:string
    type: "ADMIN" | "EMPLOYEE" | "PATRON"
    firstName:string
    lastName:string
    email:string
    password:string
}

export interface LoginUserPayload {
    email:string,
    password:string
}

export interface RegisterUserPayLoad {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    type: "ADMIN" | "EMPLOYEE" | "PATRON"
}

export interface FetchUserPayload {
    userId :string,
    property:"loggedInUser" | "profileUser"
}