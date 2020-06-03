import React, {useState} from "react"
import classes from "./Conditions.module.css"

const conditions = (props) => {
    return (
        <div className={classes.Wrapper}>

            {props.error ? <small className={classes.Small}>Please enter a valid city.</small> : null}

            {props.isLoading ? <div className={classes.Loader}>Checking the wind...</div>: null}
            
            {props.responseObj.cod === 200 ?
                <div>
                    <p><strong className={classes.boldText}>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.list[0].main.temp)} degrees out with {props.responseObj.list[0].weather[0].description}.</p>
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