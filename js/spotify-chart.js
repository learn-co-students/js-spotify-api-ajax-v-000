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
  var popularities = [];
  $.each(tracks, function(index, track){
    popularities.push(track.popularity)
  })
  console.log(popularities);
  return popularities;
}

function extractNames(tracks) {
  var names = [];
  $.each(tracks, function(index, track){
    names.push(track.name)
  })
  console.log(names);
  return names;
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
  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    success: function(response){
      callback(response.tracks);
    }
  });
}

function success(parsedJSON) {
  var names = extractNames(parsedJSON);
  var popularities = extractPopularity(parsedJSON);
  var data = chartData(names, popularities)
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(ctx).Bar(data);
}

$(document).ready(function() {
  getSpotifyTracks(success);
});
