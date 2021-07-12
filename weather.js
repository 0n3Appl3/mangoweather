var key = "<key>";
var lon = 0;
var lat = 0;

function requestWeatherData(area) {
    ScrollReveal().reveal('#current', { distance: '-30px', easing: 'ease', cleanup: true, interval: 200 });
    ScrollReveal().reveal('#forecast', { distance: '-30px', easing: 'ease', cleanup: true, delay: 260, interval: 200 });
    const sendWeatherReport = "http://api.openweathermap.org/data/2.5/weather?q=" + area + ",nz" + "&appid=" + key;

    fetch(sendWeatherReport)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);
            lon = weatherData.coord.lon;
            lat = weatherData.coord.lat;
            console.log(lon + " " + lat);
            getWeatherData(weatherData);
        });
}

function getWeatherData(weatherData) {
    const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
    const description = weatherData.weather[0].description;
    const formattedDesc = description.charAt(0).toUpperCase() + description.slice(1);
    const test = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + key;

    document.getElementById("current").style.visibility = "visible";
    document.getElementById("forecast").style.visibility = "visible";

    document.getElementById("current").style.transition = "0.5s";
    document.getElementById("forecast").style.transition = "0.5s";

    document.getElementById("location").innerHTML = weatherData.name;
    document.getElementById("currentTemp").innerHTML = parseFloat((weatherData.main.temp - 273.15)).toFixed(1) + "&deg;C";
    document.getElementById("visual").innerHTML = "<img src=" + icon + ">";
    document.getElementById("description").innerHTML = formattedDesc;

    fetch(test)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);
            getForecastData(weatherData);
        })
}

function getForecastData(weatherData) {
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const icon = "http://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "@2x.png";
    const icon2 = "http://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + "@2x.png";
    const icon3 = "http://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + "@2x.png";
    const icon4 = "http://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + "@2x.png";
    const icon5 = "http://openweathermap.org/img/wn/" + weatherData.daily[5].weather[0].icon + "@2x.png";

    var dayOne = new Date(weatherData.daily[1].dt * 1000);
    var dayTwo = new Date(weatherData.daily[2].dt * 1000);
    var dayThree = new Date(weatherData.daily[3].dt * 1000);
    var dayFour = new Date(weatherData.daily[4].dt * 1000);
    var dayFive = new Date(weatherData.daily[5].dt * 1000);

    document.getElementById("data").innerHTML =
            `<br><i class="fa fa-chevron-down"></i> `
            + parseFloat((weatherData.daily[0].temp.min - 
                273.15)).toFixed(1) + "&deg;C" 
            + `&emsp;<i class="fa fa-chevron-up"></i> `
            + parseFloat((weatherData.daily[0].temp.max - 
                273.15)).toFixed(1) + "&deg;C" 
            + `&emsp;<i class="fa fa-tint"></i> ` 
            + weatherData.daily[0].humidity + "%";

    // Messy, temporary solution. To be refactored later.
    document.getElementById("dayOne").innerHTML = 
        "<img src=" + icon + "><br>" + dayName[dayOne.getDay()] + "<br><h6>" + dayOne.getDate() + " " + monthName[dayOne.getMonth()] + "</h6>";
    document.getElementById("dayTwo").innerHTML = 
        "<img src=" + icon2 + "><br>" + dayName[dayTwo.getDay()] + "<br><h6>" + dayTwo.getDate() + " " + monthName[dayTwo.getMonth()] + "</h6>";
    document.getElementById("dayThree").innerHTML = 
        "<img src=" + icon3 + "><br>" + dayName[dayThree.getDay()] + "<br><h6>" + dayThree.getDate() + " " + monthName[dayThree.getMonth()] + "</h6>";
    document.getElementById("dayFour").innerHTML = 
        "<img src=" + icon4 + "><br>" + dayName[dayFour.getDay()] + "<br><h6>" + dayFour.getDate() + " " + monthName[dayFour.getMonth()] + "</h6>";
    document.getElementById("dayFive").innerHTML = 
        "<img src=" + icon5 + "><br>" + dayName[dayFive.getDay()] + "<br><h6>" + dayFive.getDate() + " " + monthName[dayFive.getMonth()] + "</h6>";

    // Messy, temporary solution. To be refactored later.
    document.getElementById("tempOne").innerHTML = 
        `<i class="fa fa-chevron-down"></i> `
        + parseFloat((weatherData.daily[1].temp.min - 
            273.15)).toFixed(1) + "&deg;C<br>" 
        + `<i class="fa fa-chevron-up"></i> `
        + parseFloat((weatherData.daily[1].temp.max - 
            273.15)).toFixed(1) + "&deg;C"; 
    document.getElementById("tempTwo").innerHTML = 
        `<i class="fa fa-chevron-down"></i> `
        + parseFloat((weatherData.daily[2].temp.min - 
            273.15)).toFixed(1) + "&deg;C<br>" 
        + `<i class="fa fa-chevron-up"></i> `
        + parseFloat((weatherData.daily[2].temp.max - 
            273.15)).toFixed(1) + "&deg;C"; 
    document.getElementById("tempThree").innerHTML = 
        `<i class="fa fa-chevron-down"></i> `
        + parseFloat((weatherData.daily[3].temp.min - 
            273.15)).toFixed(1) + "&deg;C<br>" 
        + `<i class="fa fa-chevron-up"></i> `
        + parseFloat((weatherData.daily[3].temp.max - 
            273.15)).toFixed(1) + "&deg;C"; 
    document.getElementById("tempFour").innerHTML = 
        `<i class="fa fa-chevron-down"></i> `
        + parseFloat((weatherData.daily[4].temp.min - 
            273.15)).toFixed(1) + "&deg;C<br>" 
        + `<i class="fa fa-chevron-up"></i> `
        + parseFloat((weatherData.daily[4].temp.max - 
            273.15)).toFixed(1) + "&deg;C"; 
    document.getElementById("tempFive").innerHTML = 
        `<i class="fa fa-chevron-down"></i> `
        + parseFloat((weatherData.daily[5].temp.min - 
            273.15)).toFixed(1) + "&deg;C<br>" 
        + `<i class="fa fa-chevron-up"></i> `
        + parseFloat((weatherData.daily[5].temp.max - 
            273.15)).toFixed(1) + "&deg;C"; 
}