import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import PropTypes from 'prop-types';
import { useCities } from "../contexts/CityContext";

function CityList() {
    const {cities,isloading}=useCities()

    if(isloading) return <Spinner/>

    if (!cities.length)
        return (
          <Message message="Add your first city by clicking on a city on the map" />
        );
    
   
    return (
        <ul className={styles.cityList} >
         {
            cities?.map((city,)=>{
                return(
                 <CityItem key={city.id} city={city}/>
                )
            })
         }  
         
        </ul>
    )
}


export default CityList
