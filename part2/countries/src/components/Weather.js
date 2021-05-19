import React from 'react'
// import PropTypes from 'prop-types'

const Weather = ({ weather }) => {
    if (weather){
        return( 
            <div>        
                <div><strong>temperature: </strong>{weather.temperature}Celcius</div>
                <img alt="weather icon" src={weather.current.weather_icons[0]} />
                <div><b>wind: </b>{weather.wind_speed} mph {weather.wind_dir}</div>
            </div>
        )
    }
    return(
        <div> Weather not available, please check API key.</div>
    )
}


// Weather.PropTypes = {
//     weather: PropTypes.any.isRequired
// };
export default Weather