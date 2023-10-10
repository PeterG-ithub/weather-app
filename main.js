console.log("I AM MAIN.JS");

const search = document.querySelector(".search");
const preview = document.querySelector(".preview-container");

addEventListener("submit", async (event) => {
  console.log("Submit button has been clicked");
  event.preventDefault();
  //console.log(search.value);
  deleteOldLocation();
  await getLocationsInfo(search.value);
  console.log("done");
  generateButtonListener();
});

function deleteOldLocation() {
  preview.innerHTML = "";
}

async function getLocationsInfo(name) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=867872936e964f17b47174912231010&q=${name}`
  );
  const data = await response.json();

  const promises = data.map((element) => {
    return getWeatherInfo(
      `${element.name}, ${element.region}, ${element.country}`
    );
  });
  await Promise.all(promises);
}

async function getWeatherInfo(name) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=867872936e964f17b47174912231010&q=${name}`
  );
  const data = await response.json();
  displayWeatherInfo(data);
}

function displayWeatherInfo(response) {
  // console.log(response);
  const item = document.createElement("div");
  item.innerHTML = `<div class="item-container">
    <div class="item-head"> ${response.location.name}, ${response.location.region}, ${response.location.country}, ${response.location.localtime}</div>
    <div class="temperature">Feels like ${response.current.feelslike_c} celsius</div>

    <button class="select-button">Select</button>
  </div>`;
  preview.appendChild(item);
}

function generateButtonListener() {
  const selectButtons = document.querySelectorAll(".select-button");
  selectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("button clicked");
    });
  });
}
