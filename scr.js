/* ----------------------------------------------------------------------------------------------------
 -------------------------------------------Created by Harman and Dhanveer---------------------------
 ----------------------------------------------------------------------------------------------------*/

let btn = document.getElementById('btn');
let searchbar = document.getElementById('searchbar');
let icon = document.getElementById('icon');
let up = document.getElementById('top');
let weather = document.querySelector('.weather');
let cards = document.querySelector('.cards');
let hourly = document.getElementById('hourly');
let backtotop = document.getElementById('top');
let begin = document.querySelector('.begin');
let Data;

// days array
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// back to top
up.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

//if searched
icon.addEventListener('click', search);
searchbar.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') { search(); }
})

//control shifts to this function after writing in search box
function search() {

    // getting value from search bar
    let city = searchbar.value;

    //API fetching
    let url = `https://api.weatherapi.com/v1/forecast.json?key=0b0006e750c74c178bb92439231901&q=${city}&days=3&aqi=no&alerts=no`;
    fetch(url)
        .then((response) => {
            return response.json();
        }).then((data) => {
            Data = data; //assinging object as response to thr Data variable
            hourly.innerHTML = '';  //initially hourly must be empty

            // if no macthing city found
            if (Object.keys(data).length == 1) {
                weather.style.display = 'none';
                alert('No matching city found !!!');
                backtotop.style.display = 'none';
                btn.style.display = 'none';
                begin.style.display = 'block';
            }
            //if city found
            else {
                begin.style.display = 'none';
                btn.style.display = 'block';
                weather.style.display = 'grid';
                weather.innerHTML = `
            <div class="item" id="item-0"><p>${data.location.name}, ${data.location.country}</p></div>
            <div class="item" id="item-1">
                <img src="${data.current.condition.icon}">
                <p>${data.current.condition.text}</p>                
            </div>
            <div class="item" id="item-2">
                <h1>${data.current.temp_c}&deg;c</h1>
                <p id="last">${data.current.last_updated}</p>
                <p id="sunrise">Sunrise:${data.forecast.forecastday[0].astro.sunrise} | Sunset:${data.forecast.forecastday[0].astro.sunset}</p>
                <p id="feelslike">Feels Like : ${data.current.feelslike_c}&deg;c</p>
            </div>    
            <div class="item" id="item-3">
                <p>Wind :${data.current.wind_dir} ${data.current.wind_kph} kph</p>
                <p>Humidity :${data.current.humidity} %</p>
                <p>Pressure : ${data.current.pressure_mb} mb</p>
                <p>precipitation : ${data.current.precip_mm} mm</p>
                <p>Gust : ${data.current.gust_kph} kph</p>
            </div>
            <div class="item cards" id="item-4">
                <h3 class="date">${new Date(data.forecast.forecastday[0].date).getDate()} ${new Date(data.forecast.forecastday[0].date).toLocaleString('default', { month: 'short' })} | ${days[new Date(data.forecast.forecastday[0].date).getDay()]}</h3>
                <img src="${data.forecast.forecastday[0].day.condition.icon}">
                <h4>${data.forecast.forecastday[0].day.condition.text}</h4>
                <span>
                    <p id="min">min: ${data.forecast.forecastday[0].day.mintemp_c}&deg; c</p>
                    <p id="max">max: ${data.forecast.forecastday[0].day.maxtemp_c}&deg; c</p>
                </span>
            </div>
            <div class="item cards" id="item-5">
                <h3 class="date">${new Date(data.forecast.forecastday[1].date).getDate()} ${new Date(data.forecast.forecastday[1].date).toLocaleString('default', { month: 'short' })} | ${days[new Date(data.forecast.forecastday[1].date).getDay()]}</h3>
                <img src="${data.forecast.forecastday[1].day.condition.icon}">
                <h4>${data.forecast.forecastday[1].day.condition.text}</h4>
                <span>
                    <p id="min">min: ${data.forecast.forecastday[1].day.mintemp_c}&deg; c</p>
                    <p id="max">max: ${data.forecast.forecastday[1].day.maxtemp_c}&deg; c</p>
                </span>
            </div>
            <div class="item cards" id="item-6">
                <h3 class="date">${new Date(data.forecast.forecastday[2].date).getDate()} ${new Date(data.forecast.forecastday[2].date).toLocaleString('default', { month: 'short' })} | ${days[new Date(data.forecast.forecastday[2].date).getDay()]}</h3>
                <img src="${data.forecast.forecastday[2].day.condition.icon}">
                <h4>${data.forecast.forecastday[2].day.condition.text}</h4>
                <span>
                    <p id="min">min: ${data.forecast.forecastday[2].day.mintemp_c}&deg; c</p>
                    <p id="max">max: ${data.forecast.forecastday[2].day.maxtemp_c}&deg; c</p>
                </span>
            </div>
            `;
                backtotop.style.display = 'block';
                window.scrollTo({
                    top: 294,
                    behavior: 'smooth'
                });
            }
        })
}

//hourly weather

btn.addEventListener('click', () => {
    // show
    if (hourly.innerHTML == '' && weather.style.display != 'none') {
        hourly_weather();
    }
    // hide
    else if (hourly.innerHTML != '' && weather.style.display != 'none') {
        window.scrollTo({
            top: 294,
            behavior: 'smooth'
        });
        hourly.innerHTML = '';
    }
})

//function when hourly weather requested
function hourly_weather() {
    let count = Data.forecast.forecastday[0].hour.length;
    hourly.innerHTML += `<h1 id="hourlyDate">${new Date(Data.forecast.forecastday[0].date).getDate()} ${new Date(Data.forecast.forecastday[0].date).toLocaleString('default', { month: 'short' })}</h1>`;
    for (let i = 0; i < count; i++) {
        hourly.innerHTML += `
        <div class="inner">
            <p id="time">${Data.forecast.forecastday[0].hour[i].time.substr(11)}</p>
            <img class="list_icon" src="${Data.forecast.forecastday[0].hour[i].condition.icon}">
            <h2 id="temp">${Data.forecast.forecastday[0].hour[i].temp_c}&deg;c</h2>
            <p id="feel">Feels Like : ${Data.forecast.forecastday[0].hour[i].feelslike_c} &deg;c</p>
            <img src="drop.png">
            <p id="prec">${Data.forecast.forecastday[0].hour[i].precip_mm} mm</p>
        </div>`
    }
    window.scrollTo({
        top: 900,
        behavior: 'smooth'
    });
}
