import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
    order: 1;
    width: 100px;
    img {
        width: 100%;
    }
`

export default function WeatherIcon(props) {
  let imgSrc = 'null'
  if(props.data != null){
    imgSrc = props.data.weatherCode
  }
  return (
    <Icon>
        <img src={`./src/assets/${imgSrc}.png`}></img>
    </Icon>
  )
}
