'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface WeatherData {
    coord: {};
    weather: {};
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {};
    dt: number;
    sys: {};
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const Page = () => {
    const router = useParams();
    const { cityName } = router;
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName},fr&units=metric&appid=5e3c8c1b3e907d871b02002284c13bc4`
                );
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (cityName) {
            fetchData();
        }
    }, [cityName]);

    return (
        <div className="container">
            <h1 className="title">{cityName}</h1>
            <div className="weather-data">
                {weatherData ? (
                    <>
                        <p className="weather-data__item">
                            Température : {weatherData.main.temp}°C
                        </p>
                        <p className="weather-data__item">
                            Ressenti : {weatherData.main.feels_like}°C
                        </p>
                        <p className="weather-data__item">
                            Humidité : {weatherData.main.humidity}%
                        </p>
                    </>
                ) : (
                    <p>Chargement des données météo...</p>
                )}
            </div>
        </div>
    );
};

export default Page;
