import { useEffect, useState } from 'react'
import axios from 'axios';

const Weather = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherDtails, setWeatherDtails] = useState([]);
    let iconName = '';

    useEffect(() => {
        const weatherDataFetch = async () => {
            await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`)
                .then(response => {
                    setWeatherDtails(response.data);
                }).catch(err => {
                    console.log('error', err);
                });
        }
        weatherDataFetch();
    }, [])
    console.log('weather', weatherDtails)
    iconName = weatherDtails.weather;
    console.log('iconName', weatherDtails.weather)
    return (
        <div>


            {weatherDtails &&
                <div>
                    <h2>Weather in {weatherDtails.name}</h2>
                    <div>temperature {weatherDtails.main?.temp} Celcius</div>
                    {weatherDtails.weather && weatherDtails.weather.map((weatherMood) => (
                        <img src={'http://openweathermap.org/img/wn/' + weatherMood.icon + '@2x.png'} alt={weatherDtails.name} />
                    ))}
                    <div>wind {weatherDtails.wind?.speed} m/s</div>
                </div>
            }
        </div>
    )
}

export default Weather;