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
	degrees.innerHTML = degreesNow;
	description.innerHTML = response.data.weather[0].description;
	humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	wind.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`;
	icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
}
//city change//
function defaultCity(city) {
	let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
	let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
	let apiKey = "0ebc654fccbc00189d5408f3d6f15b08";
	let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiCall).then(someWeather);
}
function myLocation(event) {
	navigator.geolocation.getCurrentPosition(weatherMyLocation);
}
let myCurrentPosition = document.querySelector("#current-location");
myCurrentPosition.addEventListener("click", myLocation);

//weather degrees conversion
let currentUnit = "celsius"; // initialize current unit to Celsius

function convertTemperature(event) {
	event.preventDefault();
	let degreesCurrent = document.querySelector("#degrees");

	if (currentUnit === "celsius") {
		// convert Celsius to Fahrenheit
		celsiusDeg.classList.remove("active");
		fahrenheitDeg.classList.add("active");
		let celsiusValue = parseFloat(degreesCurrent.innerHTML);
		let fahrenheitValue = (celsiusValue * 9) / 5 + 32;
		degreesCurrent.innerHTML = Math.round(fahrenheitValue);
		currentUnit = "fahrenheit";
	} else {
		// convert Fahrenheit to Celsius
		fahrenheitDeg.classList.remove("active");
		celsiusDeg.classList.add("active");
		let fahrenheitValue = parseFloat(degreesCurrent.innerHTML);
		let celsiusValue = ((fahrenheitValue - 32) * 5) / 9;
		degreesCurrent.innerHTML = Math.round(celsiusValue);
		currentUnit = "celsius";
	}
}

let celsiusDeg = document.querySelector("#celsius");
celsiusDeg.addEventListener("click", convertTemperature);

let fahrenheitDeg = document.querySelector("#fahrenheit");
fahrenheitDeg.addEventListener("click", convertTemperature);

defaultCity("Stockholm");
