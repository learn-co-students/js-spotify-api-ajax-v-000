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
  var top10Tracks = tracks.slice(0,10);
  return top10Tracks;
};

function extractPopularity(tracks) {
  var popularity = tracks.map(function(track){
    return track.popularity;
  })
  return popularity;
};

function extractNames(tracks) {
  var trackNames = tracks.map(function(track){
    return track.name;
  })
  return trackNames;
};

function chartData(labels, inputData) {
  dataSetProperties['data'] = inputData;
  var data = {
    labels: labels,
    datasets: [dataSetProperties]
  }
  return data;
};

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(response){
      callback(response);
    }
  })
};

function success(parsedJSON) {
  var topTracks = extractTop10Tracks(parsedJSON.tracks);
  var trackNames = extractNames(top20Tracks);
  var popularity = extractPopularity(top20Tracks);
  var data = chartData(trackNames, popularity);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var chart = new Chart(ctx).Bar(data);
};
