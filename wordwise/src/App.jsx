import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import { useEffect,useState } from 'react'
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
function App() {
const [cities,setCities]=useState([])
const [isloading,setIsLoading]=useState(false)

const BASE_URL="http://localhost:8000"

useEffect(()=>{
 
   async function fetchCities(){
    try{
    setIsLoading(true)
     const res= await fetch(`${BASE_URL}/cities`)
     const data= await res.json()
     setCities(data)
     setIsLoading(false)
   
  }catch(err){
    alert("There is an error loading data")
  }finally{
    setIsLoading(false)
   
  }
}
  fetchCities()

},[])

  return (
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<HomePage/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="app" element={<AppLayout/>}>
        <Route index element={<Navigate replace to="cities"/>}/>
        <Route path="cities" element={<CityList cities={cities} isloading={isloading}/>}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList cities={cities} isloading={isloading}/>}/>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="login" element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
