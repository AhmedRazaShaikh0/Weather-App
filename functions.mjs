async function WeatherApp(e) {
  e.preventDefault();
  const input = document.querySelector("#input").value;
  let temp = document.querySelector("#celcius");
  let fahrenheit = document.querySelector("#fahrenheit");
  let status = document.querySelector(".weatherCondition");
  let img = document.querySelector(".weatherIcon img");
  let city = document.querySelector("#city");
  let country = document.querySelector("#country");
  const BASE_URL = "https://api.weatherapi.com";
  const API_KEY = "168e245731fe44d0a5051548230707";
  const LOCATION = input;

  if (!input.length) {
    temp.innerHTML = "0";
    fahrenheit.innerHTML = "0";
    status.innerHTML = "Enter Location";
    city.textContent = " ";
    country.textContent = " ";
    return;
  }
  try {
    const res = await axios.get(
      `${BASE_URL}/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=no`
    );
    const data = await res;
    temp.innerHTML = data.data.current.temp_c;
    fahrenheit.innerHTML = data.data.current.temp_f;
    city.textContent = data.data.location.name + ",";
    country.textContent = data.data.location.country;
    if (data.data.current.temp_c > 30) {
      status.innerHTML = "Too hot";
      img.src = "./images/day.svg";
    } else if (data.data.current.temp_c > 20) {
      status.innerHTML = "Moderate";
      img.src = "./images/cloudy-day-1.svg";
    } else if (data.data.current.temp_c > -100) {
      status.innerHTML = "Too cold";
      img.src = "./images/snowy-6.svg";
    }

    // console.log("data", data.data);
  } catch (error) {
    if (error) {
      // console.log("error sdfdf", error.response.data.error.message);
    }
    temp.innerHTML = "0";
    fahrenheit.innerHTML = "0";
    status.innerHTML = "Enter Valid Location";
    city.textContent = " ";
    country.textContent = " ";
    img.src = "./images/959873.png";
  }

}

document.addEventListener("submit", WeatherApp);