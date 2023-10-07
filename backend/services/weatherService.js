const axios = require("axios");
const fs = require("fs");

async function getWeatherFromAccuWeather() {
  const url =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/117910?apikey=7Kpw8dhLSppFDt65EIbzgauXcuCDbTDI";
  const response = await axios.get(url);
  fs.writeFileSync("accuWeatherResponse.json", JSON.stringify(response.data, null, 2)); // writes response to a file
  return response;
}

async function getWeatherFromOpenWeather() {
  const url =
    "https://api.openweathermap.org/data/3.0/onecall?lat=45.81&lon=15.98&appid=b49305b39c389baf1e478c04357626ec";
  const response = await axios.get(url);
  fs.writeFileSync("openWeatherResponse.json", JSON.stringify(response.data, null, 2)); // writes response to a file
  return response;
}

async function compareWeather() {
  // Fetch weather data from AccuWeather API
  const response1 = await getWeatherFromAccuWeather();
  // Fetch weather data from OpenWeather API
  const response2 = await getWeatherFromOpenWeather();

  // Process OpenWeather data to extract relevant information for the next 5 days
  const openWeatherDaily = response2.data.daily.slice(0, 5).map((day) => ({
    date: new Date(day.dt * 1000),
    temperature: {
      min: day.temp.min - 273.15, // Convert temperature from Kelvin to Celsius
      max: day.temp.max - 273.15, // Convert temperature from Kelvin to Celsius
    },
    description: day.weather[0].description,
    icon: day.weather[0].icon,
  }));

  // Process AccuWeather data to extract relevant information
  const accuWeatherDaily = response1.data.DailyForecasts.map((day) => ({
    date: new Date(day.EpochDate * 1000),
    temperature: {
      min: ((day.Temperature.Minimum.Value - 32) * 5) / 9, // Convert temperature from Fahrenheit to Celsius
      max: ((day.Temperature.Maximum.Value - 32) * 5) / 9, // Convert temperature from Fahrenheit to Celsius
    },
    description: day.Day.IconPhrase,
    icon: day.Day.Icon.toString(),
  }));

  // Extract location information
  const locationOpenWeather = response2.data.timezone; // Extracted location for OpenWeather
  const locationAccuWeather = "Zagreb"; // Hardcoded location for AccuWeather

  // Return a structured object containing the processed data
  return {
    openWeatherDaily,
    accuWeatherDaily,
    locationOpenWeather,
    locationAccuWeather,
  };
}
module.exports = {
  compareWeather,
};
