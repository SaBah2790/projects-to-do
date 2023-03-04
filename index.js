let date = new Date();
let time = date.toLocaleTimeString(`en-GB`, { timeStyle: "short" });
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = time;
let day = date.toLocaleDateString(
	`en-GB`,
	{ dateStyle: "full" },
	{ weekDay: "long" }
);
let curentDay = document.querySelector("#current-day");
curentDay.innerHTML = day;

//weather api response//
function someWeather(response) {
	let newCity = document.querySelector("#the-city");
	let degreesNow = Math.round(response.data.main.temp);
	let degrees = document.querySelector("#degrees");
	let description = document.querySelector("#description");
	let humidity = document.querySelector("#humidity");
	let wind = document.querySelector("#wind");
	let icon = document.querySelector("#weather-icon");
	newCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
	degrees.innerHTML = `${degreesNow} &deg;`;
	description.innerHTML = response.data.weather[0].description;
	humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	wind.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`;
	icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
	console.log(response.data.weather[0].icon);
}
//city change//
function defaultCity(city) {
	let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
	let unit = ["metric", "imperial"];
	let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit[0]}&appid=${apiKey}`;
	axios.get(apiCall).then(someWeather);
}
function cityLookUp(event) {
	event.preventDefault();
	let city = document.querySelector("#search-city").value;
	defaultCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityLookUp);

//my weather//
function weatherMyLocation(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let unit = ["metric", "imperial"];
	let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
	let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit[0]}`;
	axios.get(apiCall).then(someWeather);
}
function myLocation(event) {
	navigator.geolocation.getCurrentPosition(weatherMyLocation);
}
let myCurrentPosition = document.querySelector("#current-location");
myCurrentPosition.addEventListener("click", myLocation);
defaultCity("Stockholm");
