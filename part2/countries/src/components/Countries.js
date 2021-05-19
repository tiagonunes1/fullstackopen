import React,{ useState } from 'react'
import SingleCountry from './SingleCountry'

const Countries = ({ country }) =>{
    const [show, setShow] = useState(false) 

    const handleShowButton = () => setShow(!show);

    if (show){
        return(
            <div>{country.name}<button onClick={handleShowButton}>{show ? "Hide" : "Show"} </button>
            <SingleCountry country={country}/>
        
            </div>
            )    
    }

    return(
        <div>{country.name}
        <button onClick={handleShowButton}>{show ? "Hide" : "Show"} </button>
        </div>
        )    
    
}

export default Countries


// {country.languages.map(l => {
//     console.log(l);
//     <li>{l.name}</li>
// })}