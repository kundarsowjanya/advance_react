import { useState,useEffect } from "react";
const KEY = "24d98a42";

export function useMovies(query,callback){

      const [movies, setMovies] = useState([]);
      const [isLoading,setIsLoading]=useState(false)
      const [error,setError]=useState("")

    useEffect(()=>{
        //it's browser api
        callback?.()
        const controller= new AbortController()
       
        const fetchMovies= async()=>{
            try{
                setIsLoading(true)
                setError('')
                const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal})
                if(!res.ok)
                   throw new Error("Something went wrong with fetching movies")
   
                const data = await res.json()
   
                
                if(data.Response==="False")
                 throw new Error("Movie not found..")
   
                setMovies(data.Search)
                setError("")
            }catch(err){
                console.log(err.message)
                if(err.nama !=="AbortError")
                setError(err.message)
            
            }finally{
             setIsLoading(false)
            }
        }
   
        if(!query.length){
         setMovies([])
         setError('')
         return
        }
   
        fetchMovies()
       // handleCloseMovie()
       // await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
       // .then((res)=>res.json())
       // .then((data)=>setMovies(data.Search))
   
       return function(){
         controller.abort()
       }
     },[query])

     return {movies,isLoading,error}
}