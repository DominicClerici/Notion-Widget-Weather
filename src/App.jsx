import { useEffect, useState } from "react"
import styled from "styled-components"
import WeatherIcon from "./WeatherIcon"
import WeatherInfo from "./WeatherInfo"

const FlexRowWrapper = styled.div`
    opacity: ${props => props.trans ? "1" : "0"};
    transition: opacity 1.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
`

const FlexColWrapper = styled.div`
    order: 2;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px 0px 10px;
`

function App() {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=37.83&longitude=-122.13&temperature_unit=fahrenheit&windspeed_unit=mph&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation_probability,visibility,uv_index&forecast_days=1&timezone=auto&daily=sunrise,sunset,weathercode")
            .then((response) => response.json())
            .then((data) => {
                // index of current time
                let ind = data["hourly"]["time"].indexOf(
                    data["hourly"]["time"].reduce((prev, curr) => {
                        return Math.abs(new Date(curr) - new Date()) < Math.abs(new Date(prev) - new Date()) ? curr : prev
                    })
                )
                setWeatherData({
                    currTemp: Math.round(data["hourly"]["temperature_2m"][ind]),
                    feelsLike: Math.round(data["hourly"]["apparent_temperature"][ind]),
                    windSpeed: Math.round(data["hourly"]["windspeed_10m"][ind]),
                    chanceOfRain: data["hourly"]["precipitation_probability"][ind],
                    // converts to miles from meters
                    visibility: data["hourly"]["visibility"][ind] / 1609.344,
                    uvIndex: data["hourly"]["uv_index"][ind],
                    sunrise: new Date(data["daily"]["sunrise"][0]).getTime(),
                    sunset: new Date(data["daily"]["sunset"][0]).getTime(),
                    weatherCode: data["daily"]["weathercode"][0],
                })
            })
    }, [])

    return (
        <FlexRowWrapper trans={weatherData == null ? false : true}>
            <WeatherIcon data={weatherData}></WeatherIcon>
            <FlexColWrapper>
                <WeatherInfo data={weatherData}></WeatherInfo>
            </FlexColWrapper>
        </FlexRowWrapper>
    )
}

export default App
