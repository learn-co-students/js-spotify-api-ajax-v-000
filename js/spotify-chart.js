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
  return tracks
}

function extractPopularity(tracks) {
  var popularityArray = [];
  for (var i = 0; i < tracks.length; i++) {
    popularityArray.push(tracks[i].popularity);
  }
  return popularityArray
}

function extractNames(tracks) {
  var namesArray = [];
  for (var i = 0; i < tracks.length; i++) {
    namesArray.push(tracks[i].name);
  }
  return namesArray
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: [{
      label: 'Popularity',
      data: inputData,
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)'
    }]
  }
  return data
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      callback(response.tracks);
    }
  });
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
  var names = extractNames(parsedJSON);
  var popularities = extractPopularity(parsedJSON);
  var data = chartData(names, popularities);
  var ctx = $("#spotify-chart").getContext('2d')
  new Chart(ctx).Bar(data);
}

$(document).ready(function(){
  getSpotifyTracks(success)
})
