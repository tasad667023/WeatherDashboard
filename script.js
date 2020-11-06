$(document).ready(function (){
    $("#search-button").on("click", function () {
        var searchValue= $("#search-value").val()


        $("#search-value").val("")

        searchWeather(searchValue)
    })

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
            cardBody.append(title)
            
    
    }

    })
    }
})