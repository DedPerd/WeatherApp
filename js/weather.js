import './view.js';
import { Now } from "./now.js";
import { Details } from './details.js';
import { AddedLocations } from './addedLocations.js';
export const Weather = {
    locationName: '',
    serverUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
    getWeather() {
        const url = `${this.serverUrl}?q=${this.locationName}&appid=${this.apiKey}&units=metric`;
        return fetch(url)
        .then(response => response.json())
        .catch(alert);
    },
    updateWeather() {
        this.getWeather()
        .then(weather => {
            Now.getWeather(weather);
            Now.updateView();
            
            Details.getWeather(weather);
            Details.updateView();
        })
        .catch(alert);
    },
    submitHandler(event) {
        event.preventDefault();
        this.locationName = event.target.firstElementChild.value;
        event.target.firstElementChild.value = '';
        this.updateWeather();
    }
}
document.querySelector('.weather__search').addEventListener('submit', () => Weather.submitHandler(event));


if(localStorage.getItem('currentLocation') === null) {
    Weather.locationName = 'Казань';
} else {
    Weather.locationName = localStorage.getItem('currentLocation');
}
Weather.updateWeather();
AddedLocations.updateView();


