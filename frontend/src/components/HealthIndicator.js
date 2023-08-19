import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const HealthIndicator = ({ health, size }) => {
    const starRenders = []

    for(let i = 0;i<5;i++){
        starRenders.push(
            <FontAwesomeIcon key={i} icon={faStar} size={size} color={i < health ? "rgb(250, 250, 100)" : "rgb(80, 80, 80)"} />
        )
    }

    return (
        <React.Fragment>
            {
                starRenders
            }
        </React.Fragment>
    )
}

export default HealthIndicator