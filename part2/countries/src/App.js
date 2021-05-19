import React, { useEffect, useState } from 'react'
import Countries from './components/Countries'
import SingleCountry from './components/SingleCountry'
import axios from 'axios'

const App = (props) =>  {

  const [ countries , setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')


  const hook = () =>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(result => { 
      setCountries(result.data)
    })
    .catch((error)=> console.error(error));
  }
  useEffect(hook,[])


 
  const handleNewFilter = (event) => {
    
    setNewFilter(event.target.value)
 }

 const countriesToShow =
  newFilter === ""
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  if (countriesToShow.length === 1) {
    return (
      <div>
        find countries <input onChange={handleNewFilter} />
        <div>
          <SingleCountry country={countriesToShow[0]} />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      find countries <input onChange={handleNewFilter}></input>      
        {countriesToShow.length > 10 ? <div>Too many matches, specify another filter</div> : countriesToShow.map(country => <Countries key={country.name} country={country}/>)}
    </div>
  );
}

export default App;