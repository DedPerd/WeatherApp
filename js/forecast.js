export const Forecast = {
    locationName: '',
    forecastList: [
        {
            date: '',
            time: '',
            temperature: 0,
            feelsLike: 0,
            weatherCondition: '',
            iconUrl: '',
        },
    ],
    getForecast(forecast) {
        this.locationName = forecast.city.name;  
        this.forecastList = forecast.list.map(item => {
            return {
                date: getDate(item.dt * 1000),
                time: getTime(item.dt * 1000),
                temperature: Math.round(item.main.temp),
                feelsLike: Math.round(item.main.feels_like),
                weatherCondition: item.weather[0].main,
                iconUrl: getIconUrl(item.weather[0].icon, 'dark'),
            }
        })
        function getDate(timestamp) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            return `${day} ${month}`;
        }
        function getTime(timestamp) {
            const date = new Date(timestamp);
            let hours = String(date.getHours());
            if(hours.length === 1) hours = '0' + hours;
            let minutes = String(date.getMinutes());
            if(minutes.length === 1) minutes = '0' + minutes;

            return `${hours}:${minutes}`;
        }
        function getIconUrl(iconCode, theme) {
            if(theme === 'dark') {
                iconCode = iconCode.replace('d', 'n');
            }
            return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }
    }, 
    updateView() {  
        document.querySelector('.forecast-tab__location-name').textContent = this.locationName;

        const ul = document.querySelector('.forecast-list');
        ul.innerHTML = '';
        this.forecastList.forEach(item => {
            ul.append(createListItem(item));
        })
        function createListItem(weatherPropertiesObject) {
            const li = document.createElement('li');    
            li.className = 'forecast-list__list-item';

            const date = document.createElement('div');
            date.className = 'forecast-list__date';
            date.textContent = weatherPropertiesObject.date;

            const time = document.createElement('div');
            time.className = 'forecast-list__time';
            time.textContent = weatherPropertiesObject.time;

            const temperature = document.createElement('div');
            temperature.className = 'forecast-list__temperature degree-celsius-symbol';
            temperature.textContent = `Temperature: ${weatherPropertiesObject.temperature}`;

            const feelsLike = document.createElement('div');
            feelsLike.className = 'forecast-list__feels-like degree-celsius-symbol';
            feelsLike.textContent = `Feels like: ${weatherPropertiesObject.feelsLike}`;

            const temperatureContainer = document.createElement('div');
            temperatureContainer.className = 'forecast-list__temperature-container';
            temperatureContainer.append(temperature, feelsLike)

            const weatherCondition = document.createElement('div');
            weatherCondition.className = 'forecast-list__weather-condition';
            weatherCondition.textContent = weatherPropertiesObject.weatherCondition;

            const icon = document.createElement('img');
            icon.className = 'forecast-list__weather-icon';
            icon.src = weatherPropertiesObject.iconUrl;
            icon.alt = weatherPropertiesObject.weatherCondition;

            weatherCondition.append(icon);

            li.append(date, time, temperatureContainer, weatherCondition);
            return li;
        }
    }
}