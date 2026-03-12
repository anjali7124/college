const container = document.getElementById("weatherContainer");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

function getWeatherEmoji(code){

if(code === 0) return "☀️";
if(code <= 3) return "⛅";
if(code <= 48) return "☁️";
if(code <= 67) return "🌧️";
if(code <= 77) return "❄️";
if(code <= 99) return "⛈️";

return "🌡️";
}

async function getCoordinates(city){

const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

const res = await fetch(url);
const data = await res.json();

if(!data.results) throw new Error("City not found");

return {
lat: data.results[0].latitude,
lon: data.results[0].longitude,
name: data.results[0].name
};
}

async function fetchWeather(city){

const coords = await getCoordinates(city);

const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

const res = await fetch(url);
const data = await res.json();

return {
city: coords.name,
temp: data.current_weather.temperature,
code: data.current_weather.weathercode
};

}

async function loadWeather(){

container.innerHTML = "";
errorDiv.innerText = "";

const cities = [
document.getElementById("city1").value,
document.getElementById("city2").value,
document.getElementById("city3").value
];

loader.style.display = "block";

try{

const promises = cities.map(city => fetchWeather(city));

const results = await Promise.all(promises);

loader.style.display = "none";

results.forEach(w => {

const card = document.createElement("div");

card.className = "card";

card.innerHTML = `
<h2>${w.city}</h2>
<div class="emoji">${getWeatherEmoji(w.code)}</div>
<div class="temp">${w.temp}°C</div>
`;

container.appendChild(card);

});

}catch(err){

loader.style.display = "none";
errorDiv.innerText = "Error fetching weather data";

}

}
