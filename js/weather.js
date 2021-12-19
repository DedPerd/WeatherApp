import './view.js';
import { Now } from "./now.js";
export const Weather = {
    locationName: '',
    serverUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
    getWeather() {
        const url = `${this.serverUrl}?q=${this.locationName}&appid=${this.apiKey}&units=metric`;
        return fetch(url)
        .then(response => response.json())
        .catch(alert)
    },
    updateWeather() {
        this.getWeather()
        .then(weather => {
            Now.getWeather(weather);
            Now.updateView();
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

window.Weather = Weather;

