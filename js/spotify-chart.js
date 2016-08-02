var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html


function extractTop10Tracks(tracks) {
  var trackArray = $.map(tracks, function(track, index){
    return track;
  });
  return trackArray;
}

//DATA for chart
function extractPopularity(tracks) {
  var trackPopularity = $.map(tracks, function(track, index){
    return track.popularity;
  });
  return trackPopularity;
}

//LABELS for chart
function extractNames(tracks) {
  var trackName = $.map(tracks, function(track, index){
    return track.name;
  });
  return trackName;
}

//labels = extractNames(tracks) && inputData = extractPopularity(tracks)
function chartData(labels, inputData) {
  var chart = {
    "labels": labels,
    "datasets": [
      {"fillColor": dataSetProperties.fillColor,
      "strokeColor": dataSetProperties.strokeColor,
      "highlightFill": dataSetProperties.highlightFill,
      "highlightStroke": dataSetProperties.highlightStroke,
      "data": inputData}
    ]
  };
  return chart;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass its
  // parameter the data it received

  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(response){
      callback(response);
    }
  })
}

//parsedJSON starts as the results from the api GET request above
function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  //  2. extractNames -  pass it the result of #1
  var names = extractNames(tracks);
  //  3. extractPopularity - pass it the result of #1
  var popularity = extractPopularity(tracks);
  //  4. chartData - pass it results of #2 and #3
  var myChartData = chartData(names, popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  //  6. make a new bar chart!
  new Chart(ctx).Bar(myChartData);
}
