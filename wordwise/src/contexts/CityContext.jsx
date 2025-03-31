
import { useReducer } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { createContext,useState,useEffect } from "react";

const BASE_URL="http://localhost:8000"

const CityContext=createContext()

function CityProvider({children}){

const initailState={
  cities:[],
  isloading:false,
  currentCity:{},
  error:''
}

function reducer(state,action){
  switch(action.type){

    case "loading":
      return { ...state, isloading: true };

    case 'cities/loaded':
      return{
        ...state,
        isloading:false,
        cities:action.payload
      };

    case 'city/loaded':
      return{
        ...state,
        isloading:false,
        currentCity:action.payload
      };

    case 'city/created':
     return{
       ...state,
       isloading:false,
       cities:[...state.cities,action.payload],
       currentCity:action.payload
     };

    case 'city/deleted':
     return{
       ...state,
       isloading:false,
       cities:state.cities.filter((city)=>city.id!=action.payload),
       currentCity:{}
     }

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default: throw new Error("Unknown action type")
  }
}



const [{cities,isloading,currentCity},dispatch]=useReducer(reducer,initailState)

useEffect(()=>{
   async function fetchCities(){
    try{
    dispatch({type:"loading"})
     const res= await fetch(`${BASE_URL}/cities`)
     const data= await res.json()
     dispatch({type:"cities/loaded",payload:data})
   
  }catch(err){
    dispatch({
      type: "rejected",
      payload: "There was an error loading cities...",
    });
  }
}
  fetchCities()

},[])

const getCity=useCallback(async function getCity(id){
  if(Number(id)===currentCity.id) return
  try{
    dispatch({type:"loading"})
     const res= await fetch(`${BASE_URL}/cities/${id}`)
     const data= await res.json()
     dispatch({type:"city/loaded",payload:data})
   
  }catch(err){
    dispatch({
      type: "rejected",
      payload: "There was an error loading city...",
    });
  }
},[currentCity.id])

async function createCity(newCity){
  try{
    dispatch({type:"loading"})
     const res= await fetch(`${BASE_URL}/cities`,{
      method:'POST',
      body:JSON.stringify(newCity),
      headers:{
        'Content-Type':'application/json'
      }
     })
     const data= await res.json()
     dispatch({type:"city/created",payload:data})
   
  }catch(err){
    dispatch({
      type: "rejected",
      payload: "There was an error creating the city...",
    });
  }
}

async function deleteCity(id){
  try{
    dispatch({type:"loading"})
     const res= await fetch(`${BASE_URL}/cities/${id}`,{
      method:'DELETE',
     })
     dispatch({ type: "city/deleted", payload: id });

     setIsLoading(false)
   
  }catch(err){
    dispatch({
      type: "rejected",
      payload: "There was an error deleting the city...",
    });
  }
}

 return(
   <CityContext.Provider value={{
    cities,
    isloading,
    currentCity,
    getCity,
    createCity,
    deleteCity
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