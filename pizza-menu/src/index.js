import React from "react";
import  ReactDOM  from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App(){
    return(
    <div className="container">
    <Header/>
    <Menu/>
    <Footer/>
     </div>
    )
}

function Header(){

  return(
    <header className="header">
   <h1 className="header">Fast React Pizza Co.</h1>
   </header>
  )
}

function Menu(){
  const pizzas= pizzaData
  const numPizzas= pizzas.length
  return (
    <main className="menu">
        <h2>Our Menu</h2>
        
        {numPizzas>0?(
            <>
            <p>
              Authentic Italian cuisine. 6 creative dishes to choose from. All
              from our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas" >
            
            {
                  pizzas.map((pizza)=>{
                  return(
                      <Pizza key={pizza.name} pizzaObj={pizza} />
                  )
                })
            }
        </ul>
              </>
        ):<p>We're still working on hour menu, please come back later :)</p>
}
          {/* <Pizza name="Pizza Salamino" ingredients="Tomato, mozarella, spinach, and ricotta cheese" photoName="pizzas/spinaci.jpg" price="10" /> */}

    </main>
  )
}

function Pizza({pizzaObj}){
    return (
    <li className={`pizza ${pizzaObj.soldOut?"sold-out":""}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name}/>
         <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
        </div>
            <span>{pizzaObj.soldOut ?"SOLD OUT" :pizzaObj.price}</span>
    </li>
    )
}

function Footer(){
   const hour= new Date().getHours();
   const openHour= 12
   const closerHour= 23
   const isOpen= hour>=openHour && hour<= closerHour


    return <footer className="footer">
        {
            isOpen ? <Order  openHour={openHour} closerHour={closerHour} /> : <p>We're happy to weclome you between {openHour} : 00 and {closerHour} : 00 </p>
        }
    </footer>
}

function Order({closerHour,openHour}){
    return(
        <div className="order">
            <p>We're open from {openHour}:00 to {closerHour}:00. Come visit us or Order online</p>
            <button className="btn">Order</button>
        </div>
    )
}





const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
<React.StrictMode>
<App/>
</React.StrictMode>
)