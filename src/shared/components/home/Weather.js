import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    render() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(position);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const appid = "bc3c40bd254aebc3c21cf92ebc307e91"; //openWeatherMap

                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=imperial`)
                    .then((res) => {
                        const { data } = res;
                        console.log(data);
                    })
            })
        } else {
            console.log("geolocation is not supported");
        }
        return null;
    }
}

export default Weather;