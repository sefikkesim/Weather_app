const currentWeather = document.querySelector("#currentweather");
const cuurentWeatherIcon = document.querySelector("#cuurentWeatherIcon");
const body = document.querySelector("body")



window.addEventListener("load", () => {
  getIPAddress()
  CurGetWeatherDataFromApi()
});

const CurGetWeatherDataFromApi = async () => {    
    let ipAddress = await fetch("https://api.vatcomply.com/geolocate");
    let data = await ipAddress.json();
    //console.log(data);
    let CurIpAddress = data.ip
    //console.log(CurIpAddress);
    
    const getCurrentCountry = await axios.get(
      `https://ipapi.co/${CurIpAddress}/json`
    );
    const currentCountryInfo = getCurrentCountry.data.city
    //console.log(currentCountryInfo);
   
    

  let apikey = DecryptStringAES(localStorage.getItem("apikey"));
  let weatherType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCountryInfo}&appid=${apikey}&units=${weatherType}`;
    const response = await axios.get(url);
    //const response = await axios(url);
    //const lonInfo = response.data.coord.lon;
    //const latInfo = response.data.coord.lat;
    //console.log(response.data.coord.lon);
    //console.log(response.data.coord.lat);
    const {weather,main } = response.data;
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
   currentWeather.innerHTML = ` ${Math.round(
     main.temp
   )}<sup>°C</sup>`;
   cuurentWeatherIcon.src = iconUrl;

    // Weather forecast daily
  //  const forecast = await axios.get(
  //    `https://api.openweathermap.org/data/2.5/onecall?lat=${latInfo}&lon=${lonInfo}&exclude=daily&appid=${apikey}&units=${weatherType}`
  //  );
  //  console.log(forecast.data.hourly); 
}

//Convert a Unix timestamp to time in JavaScript
// var s = new Date(1637780400000).toLocaleDateString("en-FI");
// console.log(s);

// Set up date and time

let yearEl = document.querySelector("#year");
let monthEl = document.querySelector("#month");
let dateEl = document.querySelector("#date");
let hourEl = document.querySelector("#hour");
let minuteEl = document.querySelector("#minute");

const updateTime = () => {
  const currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  let currentMonth = currentTime.getMonth();
  let currentDate = currentTime.getDate();
  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
  yearEl.textContent = currentYear.toString();
  monthEl.textContent = currentMonth.toString();
  dateEl.textContent = currentDate.toString();
};
setInterval(updateTime, 1000);
updateTime()
