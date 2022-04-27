import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../slices/category/category.reducer'
import postreducer from '../slices/post/postSlices'
import userReducer from '../slices/user/user.reducer'


const store = configureStore({
    reducer : {
        users : userReducer,
        category : categoryReducer,
        post : postreducer
    }
})

export default store