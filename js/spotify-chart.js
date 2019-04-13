var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractNames(tracks) {
  return tracks.map(function(track) {
    return track.name;
  });
}

function extractPopularity(tracks) {
  return tracks.map(function(track) {
    return track.popularity;
  });
}

function chartData(labels, inputData) {
  var data = {};
  data.labels = labels;
  data.datasets = [dataSetProperties];
  data.datasets[0].data = inputData;

  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(result) {
      callback(result);
    }
  });
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);

  var chart_data = chartData(names, popularity);
  var ctx = $('#spotify-chart').get(0).getContext('2d');
  var myBarChart = new Chart(ctx).Bar(chart_data);

}

$(function() {
  getSpotifyTracks(success);
});
