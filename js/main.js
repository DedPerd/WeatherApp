'use strict'

document.querySelector('.forecast__nav-item').classList.add('forecast__nav-item_active');
document.querySelector('.forecast__tabs-item').classList.add('forecast__tabs-item_active');

document.querySelectorAll('.forecast__nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        document.querySelectorAll('.forecast__nav-item').forEach(item => {
            item.classList.remove('forecast__nav-item_active')
        });
        item.classList.add('forecast__nav-item_active');

        document.querySelectorAll('.forecast__tabs-item').forEach(item => {
            item.classList.remove('forecast__tabs-item_active');
        });
        const tabId = event.target.href.slice(event.target.href.lastIndexOf('#'));
        const tab = document.querySelector(tabId);
        tab.classList.add('forecast__tabs-item_active');
        event.preventDefault();
    });
});

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityName = 'Kazan’';
let url = 'https://api.openweathermap.org/data/2.5/weather?q=kazan&appid=f660a2fb1e4bad108d6160b7f58c555f&units=metric';

document.querySelector('.weather__search').addEventListener('submit', (event) => {
    event.preventDefault();
    cityName = event.target.firstElementChild.value;
    url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    event.target.firstElementChild.value = '';
    updateWeather();
});

function updateWeather() {
    fetch(url)
    .then(response => {
        return response.json();
    }).then(weather => {
        const temperature = Math.round(weather.main.temp);
        const iconCode = weather.weather[0].icon.slice(0, -1) + 'n'; // d в конце - это светлая тема, а n - темная;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const cityName = weather.name;

        document.querySelector('.now-tab__temperature').textContent = String(temperature);
        document.querySelector('.now-tab__weather-icon').src = iconUrl;
        document.querySelector('.now-tab__city-name').textContent = cityName;
    });
}
updateWeather();