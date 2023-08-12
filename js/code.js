async function getWeather(city) {
    let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2ac45727c9f745fbbc4205010231108&q=${city}&days=3`);
    let data = await req.json();
    displayWeather(data);
}
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "october", "November", "December"]
function displayWeather(data) {
    let icon = data.current.condition.icon;
    let date = new Date(data.current.last_updated)
    let day = date.toLocaleDateString("en-US", { weekday: "long" });
    icon = icon.slice(icon.indexOf("64"));
    let html = `
    <div class="col-md-4 px-0 color1" id="test"> 
    <div class="data  pb-4">
    <div class="bg-opacity-25 font-color bg-black d-flex align-items-center justify-content-between py-3 px-2">
        <p>${day}</p>
        <p>${(date.getMonth()) + 1}${months[date.getMonth()]}</p>
    </div>
    <div class="px-3">
        <p class="pt-3 font-color fs-6">${data.location.name}</p>
        <div class="current d-flex justify-content-between align-items-center">
            <p>${data.current.temp_c}<sup>o</sup>C</p>
            <img src="img/${icon}" width="90" alt="">
        </div>
        <p class="pb-3 color2">${data.current.condition.text}</p>
        <div class="icons fs-6 d-flex font-color justify-content-start align-items-center gap-4">
            <p><span><i class="fa-solid fa-umbrella pe-1"></i></span>20%</p>
            <p><span><i class="fa-solid fa-wind pe-1"></i></span>18km/h</p>
            <p><span><i class="fa-regular fa-compass pe-1"></i></span>East</p>
        </div>
    </div>
</div>
</div>
    `;
    for (let i = 1; i < 3; i++) {
        date = new Date(data.forecast.forecastday[i].date);
        day = date.toLocaleDateString("en-US", { weekday: "long" });
        let color = "background_color";
        i == 2 ? color = "color1" : null;
        icon = data.forecast.forecastday[i].day.condition.icon;
        icon = icon.slice(icon.indexOf("64"));
        html += `
        <div class="col-md-4 ${color} px-0">
        <div class="data  pb-4">
            <div class="bg-opacity-25 font-color bg-black text-center py-3 px-2">
            <p>${day}</p>
            </div>
            <div class="px-3 d-flex flex-column gap-3 py-4  align-items-center">
                <img src="img/${icon}" width="48" alt="">
                <div class="text-center">
                    <h4 class="fs-4 fw-bold">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
                    <p class="font-color">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</p>
                </div>
                <p class="color2">${data.forecast.forecastday[i].day.condition.text}</p>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById("weather").innerHTML = html;
}
function search(input) {
    if (input.value.length >= 3) {
        getWeather(input.value)
    }
}
getWeather("cairo");