var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(document).ready(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  return tracks.tracks;
}

function extractPopularity(tracks) {
  // your code here
  var arrayOfPopularity = [];
  for(var i = 0; i < tracks.length; i++) {
    arrayOfPopularity[i] = tracks[i].popularity
  }
  return arrayOfPopularity;
}

function extractNames(tracks) {
  // your code here
  var arrayOfNames = [];
  for(var i = 0; i < tracks.length; i++) {
    arrayOfNames[i] = tracks[i].name
  }
  return arrayOfNames;
}

function chartData(labels, inputData) {
  // your code hrr
  // use the dataSetProperties variable defined above if it helps
  var dataForChart = {
    labels: labels,
    datasets: [{
    fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)',
    data: inputData      
    }]
  };
  return dataForChart;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass its 
  // parameter the data it received
  // use the url variable defined above if it helps
  $.ajax(url).done(function(data) {success(data);});
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var tenTracks = extractTop10Tracks(parsedJSON);
  var tracksPopularity = extractPopularity(tenTracks);
  var tracksNames = extractNames(tenTracks);
  var chartStuff = chartData(tracksNames, tracksPopularity);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var myChart = new Chart(ctx).Bar(chartStuff);
}
