const currentWeather = document.querySelector("#currentweather");
const cuurentWeatherIcon = document.querySelector("#cuurentWeatherIcon");



window.addEventListener("load", () => {
  getIPAddress()
  CurGetWeatherDataFromApi()
});

const CurGetWeatherDataFromApi = async () => {    
    let ipAddress = await fetch("https://api.vatcomply.com/geolocate");
    let data = await ipAddress.json();
    console.log(data);
    let CurIpAddress = data.ip
    console.log(CurIpAddress);
    
    const getCurrentCountry = await axios.get(
      `http://ip-api.com/json/${CurIpAddress}`
    )
    const currentCountryInfo = getCurrentCountry.data.city
    console.log(currentCountryInfo);
   
    

  let apikey = DecryptStringAES(localStorage.getItem("apikey"));
  let weatherType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCountryInfo}&appid=${apikey}&units=${weatherType}`;
    const response = await axios.get(url);
    // const response = await axios(url);
    
    console.log(response.data);
    const {sys, weather,main } = response.data;
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
   currentWeather.innerHTML = ` ${Math.round(
     main.temp
   )}<sup>°C</sup>`;
   cuurentWeatherIcon.src = iconUrl;
}
