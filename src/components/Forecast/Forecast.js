import React, { useState, useEffect } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";

const Forecast = () => {
  const [responseObj, setResponseObj] = useState({});
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forecastTime, setForecastTime] = useState("");

  function getForecast(e) {
    e.preventDefault();
    //if user enters blank city search, return error
    if (city.length === 0) {
      return setError(true);
    }
    //Clear state in prep for api call
    setError(false);
    setResponseObj({});
    setIsLoading(true);

    const uriEncodedCity = encodeURIComponent(city);
    //have to secure this api key once everything is working=================
    const apiKey = encodeURIComponent("0dc26baaf4684e74bfe3377b2e8eca0b")

    //weather info for every 3 hours for the next 5 days api call
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${uriEncodedCity}&units=${unit}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
        if (response.cod !== "200") {
          throw new Error();
        }
        setResponseObj(response);
        setForecastTime(forecastTime => {
            const date = new Date(response.list[0].dt * 1000);
            // Hours part from the timestamp
            const hours = date.getHours();
            // Minutes part from the timestamp
            const minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            const seconds = "0" + date.getSeconds();
        
            // Will display time in 10:30:23 format
            return forecastTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        console.log(err.message);
      });
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

        <button className={classes.Button} type="submit">
          Get Forecast
        </button>
      </form>
      <Conditions
        responseObj={responseObj}
        error={error}
        isLoading={isLoading}
        unit={unit}
        forecastTime={forecastTime}
      />
    </div>
  );
};

export default Forecast;
