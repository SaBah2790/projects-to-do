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
	newCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
	let degreesNow = Math.round(response.data.main.temp);
	let degrees = document.querySelector("#degrees");
	degrees.innerHTML = `${degreesNow} &deg;`;
	let description = document.querySelector("#description");
	description.innerHTML = response.data.weather[0].description;
	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	let wind = document.querySelector("#wind");
	wind.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`;
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
