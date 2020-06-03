import React, {useState} from "react"
import Conditions from "../Conditions/Conditions"
import classes from "./Forecast.module.css"

const Forecast = () => {
    const [responseObj, setResponseObj] = useState({})
    const [city, setCity] = useState("")
    const [unit, setUnit] = useState("metric")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function getForecast(e) {
        e.preventDefault()

        //if user enters blank city search, return error
        if (city.length === 0) {
            return setError(true)
        }

        //Clear state in prep for api call
        setError(false)
        setResponseObj({})
        setIsLoading(true)

        const uriEncodedCity = encodeURIComponent(city)

        //weather info for every 3 hours for the next 5 days
        // fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${uriEncodedCity}&units=${unit}`, {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        //         "x-rapidapi-key": "780b9f9720msh8a723b870a9cad9p1cd1d7jsnf9211203f3ce"
	    //     }
        // })
        // fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=vancouver&units=metric", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        //         "x-rapidapi-key": "780b9f9720msh8a723b870a9cad9p1cd1d7jsnf9211203f3ce"
        //     }
        // })
        .then(response => response.json())
        .then(response => {
            setResponseObj(response)
            console.log(responseObj)
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response)
            setIsLoading(false)
        })
        .catch(err => {
            setError(true)
            setIsLoading(false)
            console.log(err.message)
        })
    }

    return (
       <div>
           <h2 className={classes.boldText}>Current Weather Conditions</h2>
           <form onSubmit={getForecast}>
            <input
                type="text"
                placeholder="Enter City"
                maxLength="50"
                value={city}
                className={classes.textInput}
                onChange={(e) => setCity(e.target.value)}
                />
            <label className={classes.Radio}>
                <input
                    type="radio"
                    name="units"
                    checked={unit === "metric"}
                    value="metric"
                    onChange={(e) => setUnit(e.target.value)}
                    />
                Celsius
            </label>
            <label className={classes.Radio}>
                <input
                    type="radio"
                    name="units"
                    checked={unit === "imperial"}
                    value="imperial"
                    onChange={(e) => setUnit(e.target.value)}
                    />
                Fahrenheit
            </label>
                
            <button className={classes.Button} type="submit">Get Forecast</button>
           </form>
           <Conditions 
                responseObj={responseObj} 
                error={error}
                isLoading={isLoading}
                />
       </div>
    )
}

export default Forecast