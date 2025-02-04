document.addEventListener('DOMContentLoaded', function () {
    const cityinput = document.getElementById('city-input');
    const searchbtn = document.getElementById('search');
    const weatherinfo = document.getElementById('weather-info');
    const cityname = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errormsg = document.getElementById('errormsg');

    const api_key = "e668b550189f99c723f60ee016404c84";

    searchbtn.addEventListener('click', async () => {
        if (cityinput.value === '') {
            errormsg.innerHTML = 'Please Enter City Name';
            errormsg.classList.remove('hidden');
            weatherinfo.classList.add('hidden');
        } else {
            errormsg.innerHTML = '';
            errormsg.classList.add('hidden');
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&appid=${api_key}&units=metric`);
                if (!response.ok) {
                    throw new Error('City Not Found');
                }
                const weatherdata = await response.json();
                displayWeatherData(weatherdata);
            } catch (error) {
                displayError(error.message);
            }
        }
    });

    function displayWeatherData(data) {
        cityname.innerText = `Place: ${data.name}`;
        temperature.innerText = `Temperature: ${data.main.temp} °C`;
        description.innerText = `Description: ${data.weather[0].description}`;
        weatherinfo.classList.remove('hidden')
        weatherinfo.classList.add('weather-info');
    }

    function displayError(error) {
        errormsg.innerText = error;
        errormsg.classList.remove('hidden');
        weatherinfo.classList.add('hidden');
    }
});