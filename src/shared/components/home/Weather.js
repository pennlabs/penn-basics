import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
        }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const appid = "bc3c40bd254aebc3c21cf92ebc307e91"; //openWeatherMap

                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=imperial`)
                    .then((res) => {
                        const { data } = res;
                        console.log(data);
                        this.setState({ weatherData: data });
                    })
            })
        }
    }

    render() {
        const { weatherData } = this.state;

        if (!weatherData) {
            return null;
        }

        const { temp } = weatherData.main;

        return (
            <h2 className="subtitle is-6">Current Temperature: {temp}</h2>
        )
    }
}

export default Weather;