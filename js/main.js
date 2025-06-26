async function getWheather(s) {
    var url = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c837fb53f0f148cf9f3164236252506&q=${s}&days=3`)
    var urlJson = await url.json()
    disCurrent(urlJson.location, urlJson.current);
    nextdays(urlJson.forecast.forecastday)
    console.log(urlJson);
}

document.getElementById("search").addEventListener("keyup", function (e) {
    getWheather(e.target.value)
})

var date = new Date();

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var monthName = months[date.getMonth()];
var dayName = days[date.getDay()];

function disCurrent(country, temperature) {
    var currentLOC = `<div  class="current col-12 col-lg-4 rounded-2 p-3">
                            <div class="d-flex justify-content-between align-content-center bg-dagblack text-white w-100 p-2"><span>${dayName}</span><span>${date.getDate()}${monthName}</span></div>
                            <div class="text-white mt-3" ><span>${country.name}</span> <p class="fs-1 fw-semibold">${temperature.temp_c}<sup>o</sup>C</p> <div> <img src="${temperature.condition.icon}"></div><div class="text-primary"> ${temperature.condition.text}</div>
                           
                    </div>`
    document.getElementById("table").innerHTML = currentLOC
}


function nextdays(temperature) {
    var maxtemp = ``
    var icon = ``
    var text = ``
    for (var i = 1; i < temperature.length; i++) {
        maxtemp = temperature[i].day.maxtemp_c
        icon = temperature[i].day.condition.icon
        text = temperature[i].day.condition.text
        mintemp = temperature[i].day.mintemp_c

        document.getElementById("table").innerHTML += `
        <div id="day" class="current col-12 col-lg-4  text-white rounded-2 p-3">
        <div class="d-flex justify-content-between align-content-center bg-dagblack text-white   p-2"><span class="text-center w-100">${days[date.getDay() + i]}</span></div>
            <img src="${icon}" class="position-relative start-50 translate-middle-x">            
        <div class="text-white mt-3 text-center fs-4" > ${parseFloat(maxtemp)}<sup>o</sup>C</p></div>   
        <div class="text-secondary mt-3 text-center fs-6" > ${parseFloat(mintemp)}<sup>o</sup>C</p></div>   
        <div class="text-primary text-center">${text}</div>
                    </div> `
    }
}
getWheather("cairo")