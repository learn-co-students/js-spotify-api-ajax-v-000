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
  return tracks;
}

function extractPopularity(tracks) {
  return $.map(tracks, function(track, index){
    return track['popularity'];
  });
}

function extractNames(tracks) {
  return $.map(tracks, function(track, index){
    return track['name'];
  });
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: [
      {
      fillColor : 'rgba(220,220,220,0.5)',
      strokeColor : 'rgba(220,220,220,0.8)',
      highlightFill : 'rgba(220,220,220,0.75)',
      highlightStroke : 'rgba(220,220,220,1)',
      data: inputData
      }
    ]
  };
  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: callback
  });
}

function success(parsedJSON) {

  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var data = chartData(names, popularity);

  var ctx = document.getElementById('spotify-chart').getContext('2d');
  var spotifyChart = new Chart(ctx).Bar(data);
}
