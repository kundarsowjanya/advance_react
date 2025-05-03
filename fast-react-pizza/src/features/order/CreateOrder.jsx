import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart"
import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const navigation=useNavigation()
  const dispatch=useDispatch()
  const isSubmitting=navigation.state==="submitting"
  const formError=useActionData();
  const {userName,status:addressStatus,position,address,error:errorAddress}=useSelector(state=>state.user)
  const totalCartPrice=useSelector(getTotalPrice)
  const priorityPrice=withPriority?totalCartPrice*0.2:0
  const totalPrice=totalCartPrice+priorityPrice
  const isLoadingAdress=addressStatus==="loading"

  
   if(!cart.length){
    return  <EmptyCart/>
   } 
  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

     

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required  className="input grow" defaultValue={userName}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label lassName="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required  className="input w-full"/>
            {formError?.phone&&<p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formError.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label lassName="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full" disabled={isLoadingAdress} defaultValue={address}/>
            {addressStatus==="error"&&<p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{errorAddress}</p>}
          </div>
          {!position.latitude&&!position.longitude&&<span className="absolute right-[3px] z-50 top-[3px]">
            <Button type="small" disabled={isLoadingAdress} onClick={(e)=>{e.preventDefault()
              
               dispatch(fetchAddress())}}>Get Position</Button>
          </span>}
        </div>


        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-0"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={position.latitude&&position.longitude?`${position.latitude},${position.longitude}`:""}/>
          <Button type="primary" disabled={isSubmitting||isLoadingAdress} >{isSubmitting?"Placing Order":`Order now for ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData=await request.formData()
  const data=Object.fromEntries(formData)


  const order={
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority==="true"
  }


  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder=await createOrder(order)
 
   store.dispatch(clearItem())
 
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
