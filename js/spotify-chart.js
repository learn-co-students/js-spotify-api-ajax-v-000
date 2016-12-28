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
  var popularityList = [];
  for (i = 0; i < tracks.length; i++) {
    popularityList.push(tracks[i].popularity);
  }
  return popularityList;
}

function extractNames(tracks) {
  var nameList = [];
  for (i = 0; i < tracks.length; i++) {
    nameList.push(tracks[i].name);
  }
  return nameList;
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: []
  };
  data.datasets[0] = dataSetProperties
  data.datasets[0].data = inputData
  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: "GET",
    success: function(result) {
      callback(result);
    }
  })
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var labels = extractNames(tracks);
  var inputData = extractPopularity(tracks);
  var data = chartData(labels, inputData);
  var ctx = document.getElementById("spotify-chart").getContext("2d");

  var chart = new Chart(ctx).Bar(data);
}
