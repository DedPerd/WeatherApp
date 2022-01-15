import './view.js';
import { Now } from "./now.js";
import { Details } from './details.js';
import { Forecast } from './forecast.js';
import { AddedLocations } from './addedLocations.js';
export const Weather = {
    locationName: '',
    apiKey: 'c66e144fd8e78f9ab750fc065dbc79bd',
    getCurrentWeather() {
        const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const url = `${serverUrl}?q=${this.locationName}&appid=${this.apiKey}&units=metric`;

        return fetch(url)
        .then(response => {  
            if(response.ok === false) {
                throw new Error(`Не удалось получить погоду на сегодня ${response.status} (${response.statusText})`);
            }
            return response.json();
        });
    },
    getForecast() {
        const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        const url = `${serverUrl}?q=${this.locationName}&appid=${this.apiKey}&units=metric`;
        return fetch(url)
        .then(response => {  
            if(response.ok === false) {
                throw new Error(`Не удалось получить прогноз погоды ${response.status} (${response.statusText})`);
            }
            return response.json();
        });
    },
    updateWeather() {
        this.getCurrentWeather()
        .then(weather => {
            Now.getCurrentWeather(weather);
            Now.updateView();
            
            Details.getCurrentWeather(weather);
            Details.updateView();
        })
        // Получить прогноз погоды только после получения текущей погоды
        .then(() => {
            this.getForecast()
            .then(forecast => {
                Forecast.getForecast(forecast);
                Forecast.updateView();
            })
            .catch(error => {
                if(error.name === 'TypeError' && error.message === 'Failed to fetch') {
                    alert(`TypeError: Не удалось получить прогноз погоды (Failed to fetch)`);
                } else {
                    alert(error)
                }
            })
        })
        .catch(error => {
            if(error.name === 'TypeError' && error.message === 'Failed to fetch') {
                alert(`TypeError: Не удалось получить погоду на сегодня (Failed to fetch)`);
            } else {
                alert(error)
            }
        })
    },
    submitHandler(event) {
        event.preventDefault();
        this.locationName = event.target.firstElementChild.value;
        event.target.firstElementChild.value = '';
        this.updateWeather();
    }
}
document.querySelector('.weather__search').addEventListener('submit', event => Weather.submitHandler(event));


if(localStorage.getItem('currentLocation') === null) {
    Weather.locationName = 'Казань';
} else {
    Weather.locationName = localStorage.getItem('currentLocation');
}
Weather.updateWeather();
AddedLocations.updateView();


