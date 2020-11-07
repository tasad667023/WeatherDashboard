$(document).ready(function (){
    $("#search-button").on("click", function () {
        var searchValue= $("#search-value").val()


        $("#search-value").val("")

        searchWeather(searchValue)
    })

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
      }

    function searchWeather(searchValue) {
        $.ajax({
          type: "GET",
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=3069eb5db63f6c2ee0a26f9403612987&units=imperial",
          dataType: "json",
          success: function(data) {
            // create history link for this search
            // if (history.indexOf(searchValue) === -1) {
            //   history.push(searchValue);
            //   window.localStorage.setItem("history", JSON.stringify(history));
            //   makeRow(searchValue);
        // }

            console.log(data);

        $("#today").empty();

        var title= $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var cardBody= $("<div>").addClass("card-body") 
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");    
        
        
        
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);
        // getForecast(searchValue);
        // getUVIndex(data.coord.lat, data.coord.lon);
            
    
    }

    })
    }





})