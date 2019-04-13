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
  // your code here
  return tracks;
}

function extractPopularity(tracks) {
  // your code here
  songPopularity = [];
  for(var i = 0, len = tracks.length; i < len; i ++) {
     songPopularity.push(tracks[i]['popularity']);
  }
  return songPopularity;
}

function extractNames(tracks) {
  // your code here
  songName = [];
  for(var i = 0, len = tracks.length; i < len; i ++) {
     songName.push(tracks[i]['name']);
  }
  return songName;
}

function chartData(barLabels, inputData) {
  // your code here

  var myChartData = {};
  myChartData.labels = barLabels;
  myChartData.datasets = [{
    data: inputData,
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)'
  }];
  return myChartData;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  $.ajax({
    url: url,
    success: callback
  })
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!

  var tracks = parsedJSON['tracks'];
  var eTracks = extractTop10Tracks(tracks);
  var eNames = extractNames(eTracks);
  var ePopularity = extractPopularity(eTracks);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var cData = chartData(eNames, ePopularity);
  var myChart = new Chart(ctx).Bar(cData);
}
