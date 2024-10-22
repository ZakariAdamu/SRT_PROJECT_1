import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [weatherData, setWeatherData] = useState(false);

	const weatherIcons = {
		"01d": clear_icon,
		"01n": clear_icon,
		"02d": cloud_icon,
		"02n": cloud_icon,
		"03d": cloud_icon,
		"03n": cloud_icon,
		"04d": drizzle_icon,
		"04n": drizzle_icon,
		"09d": rain_icon,
		"09n": rain_icon,
		"10d": rain_icon,
		"10n": rain_icon,
		"13d": snow_icon,
		"13n": snow_icon,
	};

	// Function to fetch weather data for the user's location
	const searchCity = async (city) => {
		if (city === "") {
			alert("Please enter a city name");
			return;
		}
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
				import.meta.env.VITE_APP_ID
			}`;

			const response = await fetch(url);
			const data = await response.json();

			// Handle wrong city name input
			if (!response.ok) {
				alert(data.message);
				return;
			}

			const icon = weatherIcons[data.weather[0].icon] || clear_icon;
			console.log(data);
			setWeatherData({
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				temperature: Math.round(data.main.temp),
				location: data.name,
				description: data.weather[0].description,
				icon: icon,
			});
		} catch (error) {
			setWeatherData(false);
			console.log("Error in fetching weather data");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchCity(searchQuery);
	};

	return (
		<div className="weather">
			<div className="search-bar">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search city"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<img
						src={search_icon}
						alt="search icon"
						onClick={() => searchCity(searchQuery)}
					/>
				</form>
			</div>

			{weatherData ? (
				<>
					<img
						src={weatherData.icon}
						alt="weather icon"
						className="weather-icon"
					/>
					<p className="temperature">{weatherData.temperature} &deg;C</p>
					<p className="location">{weatherData.location}</p>
					<p className="description">{weatherData.description}</p>
					<div className="weather-data">
						<div className="col">
							<img src={humidity_icon} alt="weather condition icon" />
							<div className="">
								<p>{weatherData.humidity}%</p>
								<span>Humidity</span>
							</div>
						</div>
						<div className="col">
							<img src={wind_icon} alt="weather condition icon" />
							<div className="">
								<p>{weatherData.windSpeed} Km/h</p>
								<span>Wind Speed</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Weather;
