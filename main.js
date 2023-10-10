console.log("I AM MAIN.JS");

const search = document.querySelector(".search");

addEventListener("submit", (event) => {
  console.log("Submit button has been clicked");
  event.preventDefault();
  //console.log(search.value);
  getLocationsInfo(search.value);
});

async function getLocationsInfo(name) {
  fetch(
    `https://api.weatherapi.com/v1/search.json?key=867872936e964f17b47174912231010&q=${name}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      response.forEach((element) => {
        getWeatherInfo(element.name);
      });
    });
}

async function getWeatherInfo(name) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=867872936e964f17b47174912231010&q=${name}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.location.name);
    });
}
