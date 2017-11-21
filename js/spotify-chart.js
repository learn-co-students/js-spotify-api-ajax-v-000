var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

// Shorthand for $( document ).ready() (https://learn.jquery.com/using-jquery-core/document-ready/)
$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(spotifyData) {
  return spotifyData.tracks;
}

function extractPopularity(tracks) {
  return $.map(tracks, function(track, index) {
    return track.popularity;
  });
}

function extractNames(tracks) {
  return $.map(tracks, function(track, index) {
    return track.name;
  });
}

function chartData(labels, inputData) {
  var dataObj = {};
  dataObj.labels = labels;
  dataObj.datasets = [
    {
      data: inputData,
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)'
    }
  ];
  return dataObj;
}

function getSpotifyTracks(callback){
  $.getJSON(url, function(data) {
    callback(data);
  });
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-charts
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  var top10Tracks = extractTop10Tracks(parsedJSON);
  //  2. extractNames -  pass it the result of #1
  var trackNames = extractNames(top10Tracks);
  //  3. extractPopularity - pass it the result of #1
  var trackPopularity = extractPopularity(top10Tracks);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(trackNames, trackPopularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  //  6. make a new bar chart!
  new Chart(ctx).Bar(data);
}
