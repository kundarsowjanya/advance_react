
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {thunk }from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import accontReducer from './features/accounts/accountSlice'
import customerReducer from './features/customers/customerSlice'


const rootReducer=combineReducers({
    account:accontReducer,
    customer:customerReducer
})

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store



