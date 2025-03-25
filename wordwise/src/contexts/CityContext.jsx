
import { useContext } from "react";
import { createContext,useState,useEffect } from "react";

const BASE_URL="http://localhost:8000"

const CityContext=createContext()

function CityProvider({children}){

const [cities,setCities]=useState([])
const [isloading,setIsLoading]=useState(false)
const [currentCity,setCurrentCity]=useState({})


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

async function getCity(id){
  try{
    setIsLoading(true)
     const res= await fetch(`${BASE_URL}/cities/${id}`)
     const data= await res.json()
     setCurrentCity(data)
     setIsLoading(false)
   
  }catch(err){
    alert("There is an error loading data")
  }finally{
    setIsLoading(false)
   
  }
}

 return(
   <CityContext.Provider value={{
    cities,
    setCities,
    isloading,
    setIsLoading,
    currentCity,
    getCity
   }}>
   {children}
   </CityContext.Provider>
)
}

function useCities(){
    const context=useContext(CityContext)
    if(context===undefined){
        throw new Error("Citycontext used outside of CityProvider")
    }
    return context
}

export { CityProvider,useCities};