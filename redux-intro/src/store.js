
import {configureStore} from "@reduxjs/toolkit"
import accontReducer from './features/accounts/accountSlice'
import customerReducer from './features/customers/customerSlice'


const store= configureStore({
    reducer:{
        account:accontReducer,
        customer:customerReducer
    }
})

export default store



