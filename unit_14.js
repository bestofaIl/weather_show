// приложение по умолчанию имеет небольшой список городов в селекте;
// функция addCity позволяет добавлять города из объекта cities (я не стал наполнять его большим количеством городов)


const parameters = {
    "url": 'https://api.openweathermap.org/data/2.5/',
    "API": '7e0b77ed2bf8ee75eff553fe1834c2af'
}

const cities = {
    "Lunetten": 6698635,
    "Egypt": 357994
}

const city_name = document.querySelector('.city-name');
const temperature = document.querySelector('.temp');
const weather_condition = document.querySelector('.weather-condition');
const img_place = document.querySelector('.center-img');


function getWeather () {
    const cityId = document.querySelector('#cities').value;
    fetch(`${parameters.url}weather?id=${cityId}&units=metric&APPID=${parameters.API}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    console.log(data);
    city_name.innerHTML = `<b>${data.name.toUpperCase()}</b>`;
    temperature.innerHTML = `<b>${Math.round(data.main.temp)}${'&deg'}</b>`;
    weather_condition.innerHTML = `<b>${data.weather[0].main.toUpperCase()}</b>`;
    img_place.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
}

getWeather();
document.querySelector('#cities').onchange = getWeather;

let node_select = document.querySelector('.selection');
let input_city = document.querySelector('.add_city');
let btn = document.querySelector('.btn-1');

function addCity() {
    let city = document.createElement('option');
    for (let key in cities) {
        if (input_city.value.toUpperCase() === key.toUpperCase()) {
            city.textContent = key;
            city.value = cities[key];
            node_select.append(city);
            document.querySelector('#cities').value = city.value;
            getWeather();
            input_city.value = '';
            input_city.placeholder = 'Found!';
            return 1;
        }
    }
    input_city.value = '';
    input_city.placeholder = 'Not found!';
}

btn.onclick = addCity;