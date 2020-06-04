import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";

const Forecast = () => {
  const [responseObj, setResponseObj] = useState({});
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeAway, setTimeAway] = useState("3");

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
        </label><br/>
        <label>How will you be out for?</label>
        <select onChange={(e) => setTimeAway(e.target.value/3)}>
            <option value="3">3 hours</option>
            <option value="6">6 hours</option>
            <option value="9">9 hours</option>
            <option value="12">12 hours</option>
        </select>
        <button className={classes.Button} type="submit">
          Get Forecast
        </button>
      </form>
      <Conditions
        responseObj={responseObj}
        error={error}
        isLoading={isLoading}
        unit={unit}
        timeAway={timeAway}
      />
    </div>
  );
};

export default Forecast;
