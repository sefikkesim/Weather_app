const countryInfo = document.querySelector("#countryinfo");
const cityInfo = document.querySelector("#cityinfo");




const getIPAddress = async () => {
  let ipAddress = await fetch("https://api.vatcomply.com/geolocate");
  let data = await ipAddress.json();
  getIpLocation(data.ip);
};
2
window.addEventListener("load", getIPAddress);

const getIpLocation = async (ipAddress) => {
  let ipAddress1 = await fetch(`https://ipapi.co/${ipAddress}/json`);
  let data1 = await ipAddress1.json().then((data) => {
    //console.log(data);
    cityInfo.innerHTML = data.city;
    countryInfo.innerHTML = data.country;
   
  });
};
