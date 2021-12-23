export const Details = {
    locationName: '',
    temperature: 0,
    feelsLike: 0,
    weatherCondition: '',
    sunrise: '',
    sunset: '',
    getWeather(weather) {
        this.locationName = weather.name;
        this.temperature = Math.round(weather.main.temp);
        this.feelsLike = Math.round(weather.main.feels_like);
        this.weatherCondition = weather.weather[0].main;
        this.sunrise = getFormattedDate(weather.sys.sunrise);
        this.sunset = getFormattedDate(weather.sys.sunset);

        function getFormattedDate(timestamp) {
            const date = new Date(timestamp);
            let hours = String(date.getHours());
            if(hours.length === 1) hours = '0' + hours;
            let minutes = String(date.getMinutes());
            if(minutes.length === 1) minutes = '0' + minutes;

            return `${hours}:${minutes}`;
        }
    },
    updateView() {
        document.querySelector('.details-tab__location-name').textContent = this.locationName;
        document.querySelector('.details-tab__temperature').textContent = `Temperature: ${this.temperature}`;
        document.querySelector('.details-tab__feels-like').textContent = `Feels like: ${this.feelsLike}`;
        document.querySelector('.details-tab__weather-condition').textContent = `Weather: ${this.weatherCondition}`;
        document.querySelector('.details-tab__sunrise').textContent = `Sunrise: ${this.sunrise}`;
        document.querySelector('.details-tab__sunset').textContent = `Sunset: ${this.sunset}`;
    }
}
window.Details = Details;