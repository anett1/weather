import getWeatherByCity from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.viewElems = {};
    this.connectHTMLElems();
    this.setupListeners();
  }
  connectHTMLElems = () => {
    const listOfIds = Array.from(document.querySelectorAll("[id]")).map(
      (elem) => elem.id
    );
    this.viewElems = mapListToDOMElements(listOfIds);
  };
  setupListeners = () => {
    this.viewElems.searchInput.addEventListener("keydown", this.handleSubmit);
    this.viewElems.searchButton.addEventListener("click", this.handleSubmit);
    this.viewElems.returnToSearchBtn.addEventListener(
      "click",
      this.returnToSearch
    );
  };
  handleSubmit = (event) => {
    if (event.type === "keydown") {
      this.viewElems.searchInput.style.borderColor = "black";
      this.viewElems.weatherError.innerText = "";
    }
    if (event.type === "click" || event.key === "Enter") {
      this.fadeInOut();
      let query = this.viewElems.searchInput.value;
      getWeatherByCity(query)
        .then((data) => this.displayWeatherData(data))
        .catch(() => {
          this.fadeInOut();
          this.viewElems.searchInput.style.borderColor = "red";
          this.viewElems.weatherError.innerText = "This city not found";
        });
    }
  };
  fadeInOut = () => {
    if (
      this.viewElems.mainContainer.style.opacity === "" ||
      this.viewElems.mainContainer.style.opacity === "1"
    ) {
      this.viewElems.mainContainer.style.opacity = "0";
    } else {
      this.viewElems.mainContainer.style.opacity = "1";
    }
  };
  switchView = () => {
    if (this.viewElems.weatherSearchView.style.display !== "none") {
      this.viewElems.weatherSearchView.style.display = "none";
      this.viewElems.weatherForecastView.style.display = "block";
    } else {
      this.viewElems.weatherSearchView.style.display = "flex";
      this.viewElems.weatherForecastView.style.display = "none";
    }
  };
  returnToSearch = () => {
    this.fadeInOut();
    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
    }, 500);
    this.viewElems.weatherError.innerText = "";
    this.viewElems.searchInput.style.borderColor = "black";
    this.viewElems.searchInput.value = "";
  };
  displayWeatherData = (data) => {
    this.switchView();
    this.fadeInOut();
    const weather = data.consolidated_weather[0];
    console.log(weather);
    this.viewElems.weatherCity.innerText = data.title;
    this.viewElems.weatherIcon.src = `https://www.metaweather.com//static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElems.weatherIcon.alt = weather.weather_state_name;
    this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${weather.the_temp.toFixed(
      2
    )}°C `;
    this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${weather.max_temp.toFixed(
      2
    )}°C `;
    this.viewElems.weatherMinTemp.innerText = `Min temperature: ${weather.min_temp.toFixed(
      2
    )}°C `;
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp());
