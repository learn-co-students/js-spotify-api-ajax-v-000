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

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  var popularities = []
  $.each(tracks, function(index, track) {
    popularities.push(track.popularity);
  });
  return popularities;
}

function extractNames(tracks) {
  // your code here
  var names = []
  $.each(tracks, function(index, track) {
    names.push(track.name);
  });
  return names;
}

function chartData(labels, inputData) {
  var barData = {};
  barData.labels = labels
  barData.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }];
  return barData;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(response) {
      callback(response);
    }
  });
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var data = chartData(names, popularity)

  new Chart(ctx).Bar(data);
}
