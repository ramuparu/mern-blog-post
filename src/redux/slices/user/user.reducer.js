import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseurl'


//user register action by async thunk
export const userRegistrationAction = createAsyncThunk("users/register",async(user,{rejectWithValue,getState,dispatch})=>{
   try {
       const config = {
        headers: {
            "Content-Type": "application/json"
        }
       }

       const {data} = await axios.post(`${baseUrl}/api/users/register`,user,config)  
       return data
   } catch (error) {
       if(!error?.response){
           throw error
       }
       return rejectWithValue(error?.response?.data) 
   }
})

//user login action by async thunk
export const userLoginAction = createAsyncThunk("users/login",async(userData,{rejectWithValue,getState,dispatch})=>{
    try {
        const config = {
         headers: {
             "Content-Type": "application/json"
         }
        }
 
        const {data} = await axios.post(`${baseUrl}/api/users/login`,userData,config) 
        localStorage.setItem("userInfo",JSON.stringify(data)) 
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data) 
    }
 })

 //storing user data into localstorage
 const userLoginFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

 //remove user info from localstorage
export const removeActionFromLocalStorage = createAsyncThunk('/users/logout',async(payload,{rejectWithValue,dispatch,getState})=>{
      try {
          localStorage.removeItem('userInfo');
      } catch (error) {
         if(!error?.response){
             throw error
         }
         return rejectWithValue(error?.response?.data) 
      }
 })

// creating slicing reducers 
const userSlices = createSlice({
    name : "users",
    initialState : {
        userAuth : userLoginFromLocalStorage
    },
    
    extraReducers : builder =>{
        //register builder dispatch
        builder.addCase(userRegistrationAction.pending, (state,action)=>{
            state.loading = true;

        })
        builder.addCase(userRegistrationAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.registered = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userRegistrationAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //login builder dispatch
        builder.addCase(userLoginAction.pending, (state,action)=>{
            state.loading = true;

        })
        builder.addCase(userLoginAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.userAuth = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLoginAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //logout user

        //login builder dispatch
        builder.addCase(removeActionFromLocalStorage.pending, (state,action)=>{
            state.loading = true;

        })
        builder.addCase(removeActionFromLocalStorage.fulfilled,(state,action)=>{
            state.loading = false;
            state.userAuth = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(removeActionFromLocalStorage.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default userSlices.reducer