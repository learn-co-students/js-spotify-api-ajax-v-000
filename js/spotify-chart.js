var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

$(function() {
  getSpotifyTracks(success);
});


function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  var inputData = [];
  for (var i = 0; i < tracks.length; i++) {
    inputData.push(tracks[i].popularity);
  }
  return inputData;
}

function extractNames(tracks) {
  var labels = [];
  for (var i = 0; i < tracks.length; i++) {
    labels.push(tracks[i].name);
  }
  return labels;
}

function chartData(labels, inputData) {

  var data = {
    labels: labels,
    datasets: [
      {
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data: inputData
      }
    ]
  }
  return data
}

function getSpotifyTracks(callback){

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(response) {
    callback(response);
    }
  });
}

function success(parsedJSON) {

  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var labels = extractNames(tracks);
  var inputData = extractPopularity(tracks);
  var data = chartData(labels, inputData);

  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var barChart = new Chart(ctx).Bar(data);
}
