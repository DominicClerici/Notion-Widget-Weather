import React from "react"
import styled from "styled-components"

const LocationInfo = styled.div`
    outline: 1px dashed orange;
    order: 1;
    max-height: fit-content(1.3em);
    p {
        font-size: 1.3em;
        font-family: "Poppins";
        margin: 0px;
    }
`

const WeatherData = styled.div`
    order: 2;
    max-height: fit-content(3.3em);
    outline: 1px dashed green;
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
    p {
        margin: 0px;
        font-size: 1em;
        font-family: "Poppins";
        color: rgb(100,100,100);
        line-height: 1.2em;
    }
    p.main {
        font-size: 1.3em !important;
        color:black !important;
    }
`

export default function WeatherInfo(props) {
    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes

        var ampm = hours >= 12 ? "pm" : "am"
        hours = hours % 12
        hours = hours == 0 ? 12 : hours

        return hours + ":" + minutes + ampm
    }

    let jsx
    if (props.data != null) {
        // multiply for time zone until i figure it out
        // 3600000 * hour offset, indiana 4, california 7
        let currTime = Date.now() - 3600000 * 4
        console.log(currTime)
        jsx = [
            <p className="main" key={"ct"}>
                {props.data.currTemp} &deg;<span className="tempFormat">F</span>
            </p>,
        ]
        if (props.data.windSpeed >= 12) {
            jsx.push(<p key={"wsp"}>{props.data.windSpeed}mph winds</p>)
        }
        if (props.data.chanceOfRain > 0) {
            jsx.push(<p key={"rain"}>{props.data.chanceOfRain}% chance of rain</p>)
        }
        if (props.data.uvIndex >= 5) {
            jsx.push(<p key={"rain"}>{props.data.uvIndex} UV Index</p>)
        }
        if (currTime <= props.data.sunrise) {
            jsx.push(<p key={"sunr"}>Sunrise at {msToTime(props.data.sunrise - 3600000 * 4)}</p>)
            jsx.push(<p key={"vis"}>{props.data.visibility}mi visibility</p>)
        } else if (currTime <= props.data.sunset) {
            jsx.push(<p key={"sunr"}>Sunset at {msToTime(props.data.sunset - 3600000 * 4)}</p>)
        } else {
            jsx.push(<p key={"sunr"}>Sunrise at {msToTime(props.data.sunrise - 3600000 * 4)}</p>)
            jsx.push(<p key={"vis"}>{props.data.visibility}mi visibility</p>)
        }
    } else {
        jsx = null
    }
    return (
        <>
            <LocationInfo>
                <p>Moraga, CA</p>
            </LocationInfo>
            <WeatherData>
                {jsx == null
                    ? null
                    : jsx.map((e) => {
                          return e
                      })}
            </WeatherData>
        </>
    )
}
