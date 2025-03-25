import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import { useCities } from "../contexts/CityContext";


function CountryList() {
    const {cities,isloading}=useCities()
    if(isloading) return <Spinner/>

    if (!cities.length)
        return (
          <Message message="Add your first city by clicking on a city on the map" />
        );
     const countries=cities.reduce((arr,city)=>{
        if(!arr.map((e1)=>e1.country).includes(city.country))
             return [...arr,{country:city.country,emoji:city.emoji}];
        else return arr
 } ,[])
   

    return (
        <ul className={styles.countryList} >
         {
            countries?.map((country,)=>{
                return(
                 <CountryItem key={country} country={country}/>
                )
            })
         }  
         
        </ul>
    )
}


export default CountryList
