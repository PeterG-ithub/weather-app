console.log("I AM MAIN.JS");

const search = document.querySelector(".search");
const preview = document.querySelector(".preview-container");
addEventListener("submit", (event) => {
  console.log("Submit button has been clicked");
  event.preventDefault();
  //console.log(search.value);
  deleteOldLocation();
  getLocationsInfo(search.value);
});

function deleteOldLocation() {
  preview.innerHTML = "";
}

async function getLocationsInfo(name) {
  fetch(
    `https://api.weatherapi.com/v1/search.json?key=867872936e964f17b47174912231010&q=${name}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      response.forEach((element) => {
        // console.log(`${element.name}, ${element.region}, ${element.country}`);
        getWeatherInfo(
          `${element.name}, ${element.region}, ${element.country}`
        );
      });
    });
}

async function getWeatherInfo(name) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=867872936e964f17b47174912231010&q=${name}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      displayWeatherInfo(response);
    });
}

function displayWeatherInfo(response) {
  console.log(response);
  const item = document.createElement("div");
  item.innerHTML = `<div class="item-container">
    <div class="item-head"> ${response.location.name}, ${response.location.region}, ${response.location.country}, ${response.location.localtime}</div>
    <div class="temperature">Feels like ${response.current.feelslike_c} celsius</div>

    <button class="select-button">Select</button>
  </div>`;
  preview.appendChild(item);
}
