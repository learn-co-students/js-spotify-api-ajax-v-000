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
  var Top10Tracks = [];
  $.each(tracks, function(index, track) {
    Top10Tracks.push({name: track.name, popularity: track.popularity});
  })
  return Top10Tracks;
}

function extractPopularity(tracks) {
  var popularityArray = [];
  $.each(tracks, function(index, track) {
    popularityArray.push(track.popularity);
  })
  return popularityArray;
}

function extractNames(tracks) {
  var namesArray = [];
  $.each(tracks, function(index, track) {
    namesArray.push(track.name);
  })
  return namesArray;
}

function chartData(labels, inputData) {
  var chartData = {};
  chartData.labels = labels;
  chartData.datasets = [dataSetProperties];
  chartData.datasets[0].data = inputData;
  return chartData;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,

    success: function(data) {
      callback(data);
    }
  })
}

function success(parsedJSON) {
  var extractedTracks = extractTop10Tracks(parsedJSON.tracks);
  var extractedNames = extractNames(extractedTracks);
  var extractedPopularity = extractPopularity(extractedTracks);
  var data = chartData(extractedNames, extractedPopularity);

  var ctx = $('#spotify-chart').get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);

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
}


$(document).ready(function(){
});
