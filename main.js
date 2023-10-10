console.log("I AM MAIN.JS");

const search = document.querySelector(".search");

addEventListener("submit", (event) => {
  console.log("Submit button has been clicked");
  event.preventDefault();
  //console.log(search.value);
  getWeatherInfo(search.value);
});

async function getWeatherInfo(name) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=867872936e964f17b47174912231010&q=${name}`
  ).then(function (response) {
    console.log(response.json());
  });
}
