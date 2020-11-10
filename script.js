$(document).ready(function (){
    $("#search-button").on("click", function () {
        var searchValue= $("#search-value").val()


        $("#search-value").val("")

        searchWeather(searchValue)
        // searchUv(searchValue)
    })

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
      }

    //   function searchUv(searchValue) {
    //     $.ajax({
    //       type: "GET",
    //       url: "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}" + searchValue + "&appid=3069eb5db63f6c2ee0a26f9403612987",
    //       dataType: "json",
    //       success: function(data) {
    //         console.log(data);
    //        }
    //     })
    //     } 
    function searchWeather(searchValue) {
        $.ajax({
          type: "GET",
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=3069eb5db63f6c2ee0a26f9403612987&units=imperial",
          dataType: "json",
          success: function(data) {
            // create history link for this search
            if (history.indexOf(searchValue) === -1) {
              history.push(searchValue);
              window.localStorage.setItem("history", JSON.stringify(history));
              makeRow(searchValue);
        }

          console.log(data);

        $("#today").empty();

        var title= $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var cardBody= $("<div>").addClass("card-body") 
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var uv = $("<p>").addClass("card-text").text("UV Index: " + data.main.uv);
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");    

        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);
        getForecast(searchValue);
        // getUVIndex(data.coord.lat, data.coord.lon);
     
    }

    })
    }
    function getForecast(searchValue) {
        $.ajax({
          type: "GET",
          url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=3069eb5db63f6c2ee0a26f9403612987&units=imperial",
          dataType: "json",
          success: function(data) {
            // overwrite any existing content with title and empty row
            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
            // loop over all forecasts (by 3-hour increments)
            for (var i = 0; i < data.list.length; i++) {
              // only look at forecasts around 3:00pm
              if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                // create html elements for a bootstrap card
                var col = $("<div>").addClass("col-md-2");
                var card = $("<div>").addClass("card bg-primary text-white");
                var body = $("<div>").addClass("card-body p-2");
                var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                // merge together and put on page
                col.append(card.append(body.append(title, img, p1, p2)));
                $("#forecast .row").append(col);
              }
            }
          }
        });
      }      
var history = JSON.parse(window.localStorage.getItem("history")) || [];
if (history.length > 0) {
  searchWeather(history[history.length-1]);
}
for (var i = 0; i < history.length; i++) {
  makeRow(history[i]);
}
});