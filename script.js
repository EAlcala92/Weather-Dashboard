 // Instance vars that will be used in the USA Jobs API fetch
 var host = 'api.openweathermap.org';  
 var userAgent = 'ejalcalu@yahoo.com';  
 var apiKey = '0e9eb4e1bf38f6f22d21bebf91fca2fb=';    
 var searchBtn = document.getElementById(".searchBtn");

  
 fetch(listingURL, {
    headers: {          
      "Host": host,          
      "User-Agent": userAgent,          
      "Authorization-Key": apiKey      
  } 
})

function performSearch () {
    var inputVal = document.getElementById(".citySearch").value;
    weatherSearch(inputVal)
    forecastSearch(inputVal)
}

function weatherSearch(city) {
    const listingURL= "api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+apiKey;
    fetch(listingURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        var city = document.getElementById("city");
        city.textContent = data.name;

        var today = dayjs().format('MM/DD/YYYY');
        document.getElementById(".currentDate").textContent = today
        document.getElementById(".temp").textContent = "Temp: " + data.main.temp + " \u00B0F";
        document.getElementById(".wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById(".humid").textContent = "Humidity: " + data.main.humidity + "%";
    })
}

searchBtn.addEventListener("click", performSearch);

function forecastSearch() {
    var userInput = document.getElementById('.citySearch').value;
    futureWeatherSearch(userInput);
}

function futureWeatherSearch(cityName) {
    var listingURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

    fetch(listingURL)
    .then(function(result) {
        return result.json()
    })
    .then(function(data) {
        console.log(data)
        var times = data.list;
        var filteredTimes = [];
        

        for(i=0; i< times.length; i++) {
            if(times[i].dt_txt.split(" ")[1] == "12:00:00") {
                filteredTimes.push(times[i])
            }

        }

        Forecast(filteredTimes)
    })    
}

function Forecast(arr) {
    for(i =0; i<arr.length; i++) {
        var date = arr[i].dt_txt.split(" ")[0]
        
        var currentDate = date.split('-');
        console.log(currentDate)
        document.getElementById("date-" + i).textContent = currentDate[1] + "/" + currentDate[2] + "/" + currentDate[0]
        document.getElementById("icon-" + i).innerHTML = `<img src="https://openweathermap.org/img/wn/${arr[i].weather[0].icon}.png"/>`
        document.getElementById("temp-" + i).textContent = "Temp: " + arr[i].main.temp + " \u00B0F"
        document.getElementById("wind-" + i).textContent = "Wind: " + arr[i].wind.speed + " MPH"
        document.getElementById("humid-" + i).textContent = "Humidity:" + arr[i].main.humidity + "%"
    }
    
}

