/* eslint-disable @typescript-eslint/no-unused-vars */
 import {createAsyncThunk,createSlice,PayloadAction} from "@reduxjs/toolkit"

 import {LoginUserPayload, FetchUserPayload, RegisterUserPayLoad, User} from "../../models/User"

 import axios from "axios"

 interface AuthenticationSliceState {
    isLoggedIn?: boolean,
    profileUser: User | undefined,
    loggedInUser: User | undefined
    loading:boolean
    error:boolean
    registerSuccess:boolean
 }


 const initialState:AuthenticationSliceState = {
    loggedInUser:undefined,
    profileUser: undefined,
    loading:false,
    error:false,
    registerSuccess:false
 }

 export const loginUser = createAsyncThunk(
    "auth/login",
    async(user:LoginUserPayload, thunkAPI)=>{
        try{
            const req = await axios.post("http://localhost:8000/auth/login", user)
            return req.data.user
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
 )

 export const registerUser = createAsyncThunk(
    "auth/register",
    async(user:RegisterUserPayLoad, thunkAPI)=>{
        try{
            const req = await axios.post("http://localhost:8000/auth/register", user)
            return req.data.user
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
 )

 export const fetchUser = createAsyncThunk(
    "auth/fetch",
    async(payload:FetchUserPayload, thunkAPI)=>{
        try{
            const req = await axios.get(`http://localhost:8000/auth/users/${payload.user}`)
            const user =req.data.user
            return {
                user ,
                property: payload.property
            }
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
 )





export const AuthenticationSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{
        resetRegisterSuccess(state) {
            state = {
                ...state,
                registerSuccess:false
            }
        }
    },
    extraReducers:(builder) =>{
        //pending logic
        builder.addCase(loginUser.pending, (state) =>{
            state.error = false
            state.loading = true
        })
        builder.addCase(registerUser.pending, (state) =>{
            state.error = false
            state.loading = true
        })

        //resolved logic
        builder.addCase(loginUser.fulfilled, (state,action) =>{
            state.loading = false
            state.loggedInUser = action.payload
        })
        
        builder.addCase(registerUser.fulfilled, (state) =>{
            state.loading = false
            state.registerSuccess = true
        })
        
        //rejected logic
        builder.addCase(loginUser.rejected, (state) =>{
            state.error = true
            state.loading = false
        })
        builder.addCase(registerUser.rejected, (state) =>{
            state.error = true
            state.loading = false
        })
    }
})
 // eslint-disable-next-line no-empty-pattern
 export const {resetRegisterSuccess} = AuthenticationSlice.actions;
 export default AuthenticationSlice.reducer