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
  var nameArray = [];
  $.each(tracks, function(index, track) {
    nameArray.push(track.name);
  })
  return nameArray;
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
}

$(document).ready(function(){
  
});
