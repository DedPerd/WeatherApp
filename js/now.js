import { AddedLocations } from "./addedLocations.js";
export const Now = {
    locationName: '',
    temperature: 0,
    iconUrl: '',
    isLiked: false,
    addedLocations: AddedLocations,
    getCurrentWeather(weather) {
        this.locationName = weather.name;
        localStorage.setItem('currentLocation', this.locationName);
        this.temperature = Math.round(weather.main.temp);
        this.iconUrl = getIconUrl(weather.weather[0].icon, 'dark');
        this.isLiked = this.checkLiked();

        function getIconUrl(iconCode, theme) {
            if(theme === 'dark') {
                iconCode = iconCode.replace('d', 'n');
            }
            return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }
    },
    checkLiked() {
        return this.addedLocations.list.includes(this.locationName);
    },
    updateView() {
        document.querySelector('.now-tab__temperature').textContent = String(this.temperature);
        document.querySelector('.now-tab__weather-icon').src = this.iconUrl;
        document.querySelector('.now-tab__location-name').textContent = this.locationName;

        const likeButton = document.querySelector('.now-tab__like-button');
        if(this.isLiked) {
            likeButton.style.fill = '#000';
        } else {
            likeButton.style.fill = '';
        }
    },
    clickHandler() {
        if(this.isLiked) {
            this.addedLocations.removeLocation(this.locationName);
        } else {
            this.addedLocations.addLocation(this.locationName);
        }
        this.isLiked = this.checkLiked();

        this.addedLocations.updateView();
        this.updateView();
    }
}
document.querySelector('.now-tab__like-button').addEventListener('click', () => Now.clickHandler());
