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

function extractTop10Tracks(parsedJSON) {
  return parsedJSON.tracks;
}

function extractPopularity(tracks) {
  var popTracks = []
  tracks.forEach(function(track){
    popTracks.push(track.popularity);
  })
  return popTracks;
}

function extractNames(tracks) {
  var names = []
  tracks.forEach(function(track){
    names.push(track.name);
  })
  return names;
}

function chartData(labels, inputData) {
  var data = {};

  data.labels = labels;
  data.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }];

  return data;
}

function getSpotifyTracks(callback){
  $.getJSON(url, function(response){
    success(response);
  })
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
  // names.forEach(function(name){
  //   $('#track-names').append('<li>' + name + '</li>');
  // })
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var pop = extractPopularity(tracks);

  var data = chartData(names, pop);
  var ctx = document.getElementById("#spotify-chart");
  new Chart(ctx).Bar(data);
}
