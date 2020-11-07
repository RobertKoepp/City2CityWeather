
$(document).ready(function(){


    $(".search-button").on("click",function(){
        var inputValue = $(".inputValue"). val()
        console.log(inputValue)
weatherSearch(inputValue)
forecastSearch(inputValue)
    })

function weatherSearch(inputValue){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+inputValue+"&appid=fae92321004eb045354253e084c0efba&units=imperial",
        method: "GET",
    }).then(function(data){
        console.log(data)
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        // merge and add to page
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $(".single-display").append(card);

forecastSearch(inputValue)

    })




}
function forecastSearch(inputValue){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+inputValue+"&appid=fae92321004eb045354253e084c0efba&units=imperial",
        method: "GET",
    }).then(function(data){
        console.log(data)
        $(".fiveDayForecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
    // loop over all forecasts (by 3-hour increments)
    for (var i = 0; i < data.list.length; i++) {
        // super weird way to only look at forecasts around 9:00pm
        if (data.list[i].dt_txt.indexOf("9:00:00") !== -1){
          // dynamically create html
          var col = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var body = $("<div>").addClass("card-body p-2");
          var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
          var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
          var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
          // merge together and put on page
          col.append(card.append(body.append(title, img, p1, p2)));
          $(".fiveDayForecast .row").append(col);
        }
      }




    })




}


























})