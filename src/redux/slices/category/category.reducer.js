import {createAsyncThunk,createSlice,createAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseurl'

const resetUpdateCategory = createAction('category/reset')

const resetDeleteCategory = createAction('category/delete-category-reset')

const resetAddCategory = createAction('category/addcategory-reset')

export const createCategoryAction = createAsyncThunk('/category/create',async(category, { rejectWithValue, getState, dispatch })=>{
    const user = getState()?.users
    const {userAuth} = user

    const config = {
        headers: 
        { Authorization : `Bearer ${userAuth?.token}`}
    };

    try {
        const {data} = await axios.post(`${baseUrl}/api/category`,{title : category?.title},config)
        dispatch(resetAddCategory())
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
})

//category fetching action
export const fetchingCategoryAction = createAsyncThunk('/category/title',async(categoryList, { rejectWithValue, getState, dispatch })=>{
    const user = getState()?.users
    const {userAuth} = user

    const config = {
        headers: 
        { Authorization : `Bearer ${userAuth?.token}`}
    };

    try {
        const {data} = await axios.get(`${baseUrl}/api/category`,config)
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
})

//single category fetching action by id
export const fetchingSingleCategoryAction = createAsyncThunk('/category/singlefetch',async(id, { rejectWithValue, getState, dispatch })=>{
    const user = getState()?.users
    const {userAuth} = user

    const config = {
        headers: 
        { Authorization : `Bearer ${userAuth?.token}`}
    };

    try {
        const {data} = await axios.get(`${baseUrl}/api/category/${id}`,config)
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
})

//update category  action
export const updateCategoryAction = createAsyncThunk('/category/update',async(category, { rejectWithValue, getState, dispatch })=>{
    const user = getState()?.users
    const {userAuth} = user

    const config = {
        headers: 
        { Authorization : `Bearer ${userAuth?.token}`}
    };

    try {
        const {data} = await axios.put(`${baseUrl}/api/category/update-category/${category?.id}`,{title : category?.title},config)
        dispatch(resetUpdateCategory())
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
})

//delete category  action
export const deleteCategoryAction = createAsyncThunk('/category/delete',async(id, { rejectWithValue, getState, dispatch })=>{
    const user = getState()?.users
    const {userAuth} = user

    const config = {
        headers: 
        { Authorization : `Bearer ${userAuth?.token}`}
    };

    try {
        const {data} = await axios.delete(`${baseUrl}/api/category/delete-category/${id}`,config)
        dispatch(resetDeleteCategory())
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
})

// creating slicing reducers 
const categorySlices = createSlice({
    name : "category",
    initialState : {},
    //create category reducer
    extraReducers : builder =>{
        //category builder dispatch
        builder.addCase(createCategoryAction.pending, (state,action)=>{
            state.loading = true;
        })
        builder.addCase(resetAddCategory, (state,action)=>{
            state.isAdded = true;
        })
        builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.category = action.payload;
            state.isAdded = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(createCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    
        // fetching category reducer
        
            
        builder.addCase(fetchingCategoryAction.pending, (state,action)=>{
            state.loading = true;

        })
        builder.addCase(fetchingCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.categoryList = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchingCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        }) 
        
        // fetching  single category reducer
        
            
        builder.addCase(fetchingSingleCategoryAction.pending, (state,action)=>{
            state.loading = true;

        })
        builder.addCase(fetchingSingleCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.fetchCategory = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchingSingleCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        }) 
        
        // updating category reducer
        
            
        builder.addCase(updateCategoryAction.pending, (state,action)=>{
            state.loading = true;
        })
        builder.addCase(resetUpdateCategory, (state,action)=>{
            state.isUpdated = true;
        })
        builder.addCase(updateCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.updateCategory = action.payload;
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(updateCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
        
        // deleting category reducer
        
            
        builder.addCase(deleteCategoryAction.pending, (state,action)=>{
            state.loading = true;
        })
        builder.addCase(resetDeleteCategory, (state,action)=>{
            state.isDeleted = true;
        })
        builder.addCase(deleteCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteCategory = action.payload;
            state.isDeleted = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(deleteCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        }) 
    }
})

export default categorySlices.reducer