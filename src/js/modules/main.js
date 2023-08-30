// https://home.openweathermap.org/api_keys

function main() {
	const apiKey = 'd73a2eedc036da5c15f1c6287e5a00c8',
		apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
	const searchBox = document.querySelector('.search input');
	const searchBtn = document.querySelector('.search button');
	const wetherIcon = document.querySelector('.weather-icons');

	async function checkWeather(city) {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

		if (response.status == 404 ) {
			document.querySelector('.error').style.display = 'block';
			document.querySelector('.weather').style.display = 'none';
		} else if(response.status == 404){
			document.querySelector('.error-null').style.display = 'block';
		} else {
			let data = await response.json();

			document.querySelector('.city').innerHTML = data.name;
			document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
			document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
			document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

			if (data.weather[0].main == 'Clouds') {
				wetherIcon.src = './img/icons/clouds.png';
			} else if (data.weather[0].main == 'Clear') {
				wetherIcon.src = './img/icons/clear.png';
			} else if (data.weather[0].main == 'Rain') {
				wetherIcon.src = './img/icons/rain.png';
			} else if (data.weather[0].main == 'Drizzle') {
				wetherIcon.src = './img/icons/drizzle.png';
			} else if (data.weather[0].main == 'Mist') {
				wetherIcon.src = './img/icons/mist.png';
			}

			document.querySelector('.weather').style.display = 'block';
			document.querySelector('.error').style.display = 'none';

		}


	}


	searchBtn.addEventListener('click', () => {
		checkWeather(searchBox.value);
		searchBox.value = '';
		searchBox.focus();
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Enter') {
			checkWeather(searchBox.value);
			searchBox.value = '';
			searchBox.focus();
		}
	});









	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});


}



export default main;