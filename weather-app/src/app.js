const cityInput = document.querySelector("#country-name");
const buttonSubmit = document.querySelector("button");
const theResult = document.querySelector("#the-result");
const form = document.querySelector("form");

// submit event
function submitEvent(callback) {
  cityInput.innerHTML = "";
  buttonSubmit.addEventListener("click", () => {
    theResult.innerHTML = "";
    callback(cityInput.value)
      .then((data) => {
        const x = data;

        console.log(x);
      })
      .catch((error) => console.error(error));
  });
}

//visualize data us result
function visualDataOnPage(data) {
  let dataCity = data;
  let dataList = data.list;

  dataList.forEach((datas) => {
    const text = `<div class="forecast">
  <h2 class="city">${dataCity.city.name}<sup class="country-code">${
      dataCity.city.country
    }</sup></h2>
  <h3 class="temprituer">${Math.round(datas.main.temp)}C</h3>
  <div class="icon"><img src="https://openweathermap.org/img/wn/${
    datas.weather[0].icon
  }@2x.png"></div>
  <h4 class="weather-text">${datas.weather[0].description}</h4>
</div> `;
    theResult.innerHTML += text;
  });
}

//London

// fetch data
async function fetchApi(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?cnt=5&q=${city}&appid=fc53143ee98d9422cdcd46fa501c42cf&units=metric`
  );
  const data = await response.json();

  visualDataOnPage(data);

  return data;
}

submitEvent(fetchApi);
