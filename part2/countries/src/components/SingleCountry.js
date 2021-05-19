import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Weather from './Weather'
const SingleCountry = ({ country }) =>{
    const api_key = process.env.REACT_APP_API_KEY
    const [ weather , setWeather ] = useState(null)
  
    
  const hook2 = () => {
    axios
    .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+country.capital)
    .then(result => {
      setWeather(result.data) 
    })
    .catch((error) => console.log(error));
  }
  useEffect(hook2,[country])


  const handleWeather = (event) => {

    setWeather(event.target.value)
 }
 console.log(weather)
    return(
        <div> <h1>{country.name}</h1>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <h2>languages</h2>
    <ul>
    {country.languages.map((l,i) => (
        <li key={i}>{l.name}</li>
    ))}
    </ul>
    <p><img src={country.flag} width="10%" height="50%"/></p>
    <div><h2>Weather in {country.capital}</h2></div>
    <Weather value = {weather}/>
    </div>
    )
}
export default SingleCountry