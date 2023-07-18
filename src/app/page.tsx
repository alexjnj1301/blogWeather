'use client'

import {useRouter} from 'next/navigation'
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

interface City {
    name: string;
}

const cities: City[] = [
    { name: 'Paris' },
    { name: 'Marseille' },
    { name: 'Lyon' },
    { name: 'Toulouse' },
    { name: 'Nice' },
    { name: 'Nantes' },
    { name: 'Strasbourg' },
    { name: 'Montpellier' },
    { name: 'Bordeaux' },
    { name: 'Lille' },
];

const Home = ({ weatherData }: { weatherData: WeatherData }) => {
    const router = useRouter();
    const handleCityClick = (cityName: string) => {
        router.push(`/city/${cityName}`);
    };

    return (
        <div>
            <header>
                <h1>Blog Météo</h1>
            </header>

            <main>
                <h2>Derniers Articles</h2>

                <section className="article-cards">
                    {cities.map((city, index) => (
                        <article
                            className="card"
                            key={index}
                            onClick={() => handleCityClick(city.name)}
                        >
                            <h3>{city.name}</h3>
                        </article>
                    ))}
                </section>
            </main>

            <aside>
                <h2>Météo Locale</h2>
                <div id="weather-widget">
                    {weatherData ? (
                        <>
                            <p>Température : {weatherData.main.temp}°C</p>
                            <p>Ressenti : {weatherData.main.feels_like}°C</p>
                            <p>Humidité : {weatherData.main.humidity}%</p>
                        </>
                    ) : (
                        <p>Chargement des données météo...</p>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default Home;
