const viewElems = {};

const getDOMElem = (id) => document.getElementById(id);

const connectHTMLElems = () => {
  viewElems.mainContainer = getDOMElem("mainContainer");
  viewElems.weatherSearchView = getDOMElem("weatherSearchView");
  viewElems.weatherForecastView = getDOMElem("weatherForecastView");

  viewElems.searchInput = getDOMElem("searchInput");
  viewElems.searchButton = getDOMElem("searchButton");
  viewElems.weatherCityContainer = getDOMElem("weatherCityContainer");

  viewElems.weatherCity = getDOMElem("weatherCity");
  viewElems.weatherIcon = getDOMElem("weatherIcon");

  viewElems.weatherCurrentTemp = getDOMElem("weatherCurrentTemp");
  viewElems.weatherMaxTemp = getDOMElem("weatherMaxTemp");
  viewElems.weatherMinTemp = getDOMElem("weatherMinTemp");

  viewElems.returnToSearchBtn = getDOMElem("returnToSearchBtn");
  console.log(viewElems);
};

const setupListeners = () => {
  viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
  viewElems.searchButton.addEventListener("click", onClickSubmit);
};

const onEnterSubmit = () => {
  console.log("onEnterSubmit");
};

const onClickSubmit = () => {
  console.log("onClickSubmit");
};

const initlializeApp = () => {
  connectHTMLElems();
  setupListeners();
};

document.addEventListener("DOMContentLoaded", initlializeApp);
