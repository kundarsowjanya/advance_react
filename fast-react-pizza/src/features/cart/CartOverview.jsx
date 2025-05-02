import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotoalQuantity } from "./cartSlice";
import {formatCurrency} from "../../utils/helpers"

function CartOverview() {

  const totalCartQuantity=useSelector(getTotoalQuantity)
  const totalPrice=useSelector(getTotalPrice)

  if(!totalCartQuantity) return null

  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 px-4 py-4 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
