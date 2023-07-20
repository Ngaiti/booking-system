import { useState, useEffect } from 'react';

export default function Weather() {
    const [weatherInfo, setWeatherInfo] = useState({ current_weather: [] });

    const fetchWeatherInfo = async () => {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=1.55&longitude=110.33&hourly=temperature_2m,rain&daily=uv_index_max&current_weather=true&timezone=Asia%2FSingapore');
        const data = await response.json();
        setWeatherInfo(data);
    };

    useEffect(() => {
        fetchWeatherInfo();
        const timerId = setInterval(() => {
            console.log('fetching weather data')
            fetchWeatherInfo();
        }, 600000); // Refreshes every 10 minutes

        return () => clearInterval(timerId);
    }, []);


    return (
        <div>
            <h1> Current weather (Kuching): {weatherInfo.current_weather.temperature}°C </h1>
        </div>
    )
}