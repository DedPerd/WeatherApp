import { Weather } from "./weather.js";
export const AddedLocations = {
    list: [],
    htmlList: document.querySelector('.added-locations__list'),
    addLocation(locationName) {
        if(!this.list.includes(locationName) && locationName !== '') {
            this.list.push(locationName);
        }
        localStorage.setItem('addedLocations', JSON.stringify(this.list));
    },
    removeLocation(locationName) {
        const index = this.list.findIndex(item => item === locationName);
        if(index !== -1) {
            this.list.splice(index, 1);
        }
        localStorage.setItem('addedLocations', JSON.stringify(this.list));
    },
    updateView() {
        if(localStorage.getItem('addedLocations') === null) {
            localStorage.setItem('addedLocations', '[]');
        }
        this.list = JSON.parse(localStorage.getItem('addedLocations'));
        this.htmlList.innerHTML = '';
        this.list.forEach(locationName => {
            const li = document.createElement('li');
            li.textContent = locationName;
            this.htmlList.append(li);
        })
    },
    clickHandler(event) {
        if(event.target.nodeName === 'LI') {
            Weather.locationName = event.target.textContent;
            Weather.updateWeather();
        }
    }
}
AddedLocations.htmlList.addEventListener('click', AddedLocations.clickHandler);
