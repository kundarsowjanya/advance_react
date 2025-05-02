
import {createSlice} from "@reduxjs/toolkit"
import { act } from "react"

const initialState={
     cart:[]
   // cart:[
    //     {
    //         pizzaId:12,
    //         name:"pizza pizza",
    //         quantity:2,
    //         unitPrice:12,
    //         totalPrice:24
    //     }
    // ]
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
            //payload=newItem
            state.cart.push(action.payload)
        },
        deleteItem(state,action){
            //payload=pizzaId
            state.cart=state.cart.filter((item)=>item.pizzaId!==action.payload)
        },
        increaseItemQuantity(state,action){
            //payload=pizzaId
            const item= state.cart.find((item)=>item.pizzaId===action.payload)
            item.quantity++;
            item.totalPrice=item.quantity*item.unitPrice
        },
        decreaseItemQuantity(state,action){
            //payload=pizzaId
            const item=state.cart.find((item)=>item.pizzaId===action.payload)
             item.quantity--;
             item.totalPrice=item.quantity*item.unitPrice
        },
        clearItem(state){
            state.cart=[]
        },
        
    }
})

export const {addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearItem} =cartSlice.actions;

export default cartSlice.reducer

export const getTotoalQuantity=((state)=>state.cart.cart.reduce((sum,item)=>sum+item.quantity,0));

export const getTotalPrice=(state)=>state.cart.cart.reduce((sum,item)=>sum+item.totalPrice,0)