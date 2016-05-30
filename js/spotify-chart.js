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
  return tracks.slice(0, 10);
}

function getPopularity(track, index) {
  return track.popularity;
}

function extractPopularity(tracks) {
  return tracks.map(getPopularity);
}

function getName(track, index) {
  return track.name;
}

function extractNames(tracks) {
  return tracks.map(getName);
}

function chartData(labels, inputData) {
  chartData = {'labels': labels, 'datasets': [dataSetProperties]};
  chartData['datasets'][0]['data'] = inputData;
  return chartData;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(data) {
      callback(data);
    }
  });
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var streams = extractPopularity(tracks);
  var names = extractNames(tracks);
  var data = chartData(names, streams);
  var ctx = document.getElementById('spotify-chart').getContext('2d');
  new Chart(ctx).Bar(data);
}
