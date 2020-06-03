import React from "react"
import classes from "./Conditions.module.css"
import { render } from "@testing-library/react";

const conditions = (props) => {
    return (
        <div className={classes.Wrapper}>

            {props.error ? <small className={classes.Small}>Please enter a valid city.</small> : null}

            {props.isLoading ? <div className={classes.Loader}>Checking the wind...</div>: null}
            
            {props.responseObj.cod === "200" ?
                <div>
                    <p><strong className={classes.boldText}>{props.responseObj.city.name}, </strong>{props.responseObj.city.country} Time Forecasted: {props.forecastTime}</p>
                    <p>It is currently {Math.round(props.responseObj.list[0].main.temp)} degrees {props.unit === "metric" ? "Celsius" : "Fahrenheit"} out with {props.responseObj.list[0].weather[0].description}.</p>
                    {props.responseObj.list[0].weather[0].main === "Rain" ? 
                        <p><em>Remember to bring your umbrella</em></p>
                    :   <p><em>Shouldn't need your umbrella!</em></p>
                    }
                </div>
            : null
            }
        </div>
    )
}

export default conditions