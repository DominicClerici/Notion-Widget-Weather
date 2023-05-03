import React from "react"
import styled, { keyframes } from "styled-components"

const LocationInfo = styled.div`
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
const loadInAnim = keyframes`
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }
`
const NonMain = styled.div`
    margin: 0px;
    font-size: 1em;
    font-family: "Poppins";
    color: rgb(100, 100, 100);
    line-height: 1.2em;
    animation: ${loadInAnim} 1s ease ${(props) =>  + props.del / 6}s backwards;
    /* transition: opacity 1s ${(props) => "." + props.del / 2}s; */
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
        let i = 1
        jsx = [
            <p className="main" key={"ct"}>
                {props.data.currTemp} &deg;<span className="tempFormat">F</span>
            </p>,
        ]
        if (props.data.windSpeed >= 12) {
            jsx.push(<NonMain del={i} key={"wsp"}>{props.data.windSpeed}mph winds</NonMain>)
            i++
        }
        if (props.data.chanceOfRain > 0) {
            jsx.push(<NonMain del={i} key={"rain"}>{props.data.chanceOfRain}% chance of rain</NonMain>)
            i++
        }
        if (props.data.uvIndex >= 5) {
            jsx.push(<NonMain del={i} key={"rain"}>{props.data.uvIndex} UV Index</NonMain>)
            i++
        }
        if (currTime <= props.data.sunrise) {
            jsx.push(<NonMain del={i} key={"sunr"}>Sunrise at {msToTime(props.data.sunrise - 3600000 * 4)}</NonMain>)
            i++
            jsx.push(<NonMain del={i} key={"vis"}>{props.data.visibility}mi visibility</NonMain>)
            i++
        } else if (currTime <= props.data.sunset) {
            jsx.push(<NonMain del={i} key={"sunr"}>Sunset at {msToTime(props.data.sunset - 3600000 * 4)}</NonMain>)
            i++
        } else {
            jsx.push(<NonMain del={i} key={"sunr"}>Sunrise at {msToTime(props.data.sunrise - 3600000 * 4)}</NonMain>)
            i++
            jsx.push(<NonMain del={i} key={"vis"}>{props.data.visibility}mi visibility</NonMain>)
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
