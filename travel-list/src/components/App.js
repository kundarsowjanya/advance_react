import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Status from "./Status";
 
// var initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];


export default function App(){

  const [items, setItems] = useState([])


  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id){debugger
    setItems((items)=>items.filter(item=>item.id!==id))
  }

  function handleToggleItem(id){debugger
    setItems((items)=>items.map((item)=>item.id===id?{...item,packed:!item.packed}:item))
  }

  function handleClearList(){
    const confirmed=window.confirm("Are you sure you want to delete all Items?")
    if(confirmed)
    setItems([])
  }

   return(
    <div className="app">
     <Logo/>
     <Form onAddItems={handleAddItems}/>
     <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
     <Status items={items}/>
    </div>
   )
}
