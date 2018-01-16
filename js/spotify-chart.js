var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};
// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html
$(document).ready(function() {
    getSpotifyTracks(success);
});

function extractTop10Tracks(tracks) {
  return tracks;
}

function extractPopularity(tracks) {
  var trackPopular =
    $.map(tracks, function(track, index) {
      return track.popularity;
    });

  return trackPopular;
}

function extractNames(tracks) {
  // your code here
  var trackNames = $.map(tracks, function(track, index) {
    return track.name;
  });
  return trackNames;
}

function chartData(labels, inputData) {
  var data = {};
  data["labels"] = labels;
  data["datasets"] = [];
  data["datasets"].push(dataSetProperties);
  data["datasets"][0]["data"] = inputData;
  return data;
  // your code here

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'JSON',
    success: function(response) {
      return success(response);
  }
  });

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
      extractTop10Tracks(parsedJSON["tracks"]);
  //  2. extractNames -  pass it the result of #1
        extractNames(parsedJSON["tracks"]);
  //  3. extractPopularity - pass it the result of #1
        extractPopularity(parsedJSON["tracks"]);
  //  4. chartData - pass it results of #2 and #3
        var data = chartData(extractNames(parsedJSON["tracks"]), extractPopularity(parsedJSON["tracks"]));
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myChart = new Chart(ctx).Bar(data);
}
