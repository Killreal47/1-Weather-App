// https://home.openweathermap.org/api_keys

function main() {
	const apiKey = 'd73a2eedc036da5c15f1c6287e5a00c8';
	const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
	const searchBox = document.querySelector('.search input');
	const searchBtn = document.querySelector('.search button');
	const weatherIcon = document.querySelector('.weather-icons');
	const weather = document.querySelector('.weather');

	async function checkWeather(city) {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

		document.querySelector('.error').style.display = 'none';
		document.querySelector('.error-null').style.display = 'none';

		if (response.status == 404) {
			document.querySelector('.error').style.display = 'block';
			document.querySelector('.weather').style.display = 'none';
		} else if (response.status == 400) {
			document.querySelector('.error-null').style.display = 'block';
		} else {
			let data = await response.json();

			document.querySelector('.city').innerHTML = data.name;
			document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
			document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
			document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

			if (data.weather[0].main == 'Clouds') {
				weather.insertAdjacentHTML('afterbegin', '<img src="./img/icons/clouds.webp" class="weather-icons" alt="погода">' );
			} else if (data.weather[0].main == 'Clear') {
				weather.insertAdjacentHTML('afterbegin', '<img src="./img/icons/clear.webp" class="weather-icons" alt="погода">' );
			} else if (data.weather[0].main == 'Rain') {
				weather.insertAdjacentHTML('afterbegin', '<img src="./img/icons/rain.webp" class="weather-icons" alt="погода">' );
			} else if (data.weather[0].main == 'Drizzle') {
				weather.insertAdjacentHTML('afterbegin', '<img src="./img/icons/drizzle.webp" class="weather-icons" alt="погода">' );
			} else if (data.weather[0].main == 'Mist') {
				weather.insertAdjacentHTML('afterbegin', '<img src="./img/icons/mist.webp" class="weather-icons" alt="погода">' );
			}

			document.querySelector('.weather').style.display = 'block';
			document.querySelector('.error').style.display = 'none';
			document.querySelector('.error-null').style.display = 'none';

		}
	}
	searchBtn.addEventListener('click', () => {
		if(document.querySelector('.weather-icons')){
			document.querySelector('.weather-icons').remove();
		}
		checkWeather(searchBox.value);
		searchBox.value = '';
		searchBox.focus();
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Enter') {
			if(document.querySelector('.weather-icons')){
				document.querySelector('.weather-icons').remove();
			}
			checkWeather(searchBox.value);
			searchBox.value = '';
			searchBox.focus();
		}
	});

}



export default main;