var elvisUrl = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";


$(function() {
  getSpotifyTracks(success, elvisUrl);
  //getSpotifyTracks(success, beatlesUrl);
});

function extractTop10Tracks(songs) {
  return songs.slice(0, 10);
}

function extractPopularity(songs) {
  var totalHits = [];
  for (var i = 0; i < songs.length; i++) {
    totalHits.push(songs[i].popularity);
  }
  return totalHits;
}

function extractNames(songs) {
  var songNames = [];
  for (var i = 0; i < songs.length; i++) {
    songNames.push(songs[i].name);
  }
  return songNames;
}

function chartData(labels, inputData) {
  var songData = {};
  songData.labels = labels;
  songData.datasets = [
    {
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: inputData
    }
  ];
  return songData;
}

function getSpotifyTracks(callback, url) {
  $.ajax({
    url: url,
    success: function(response) {
      callback(response);
    }
  });
}

function success(parsedJSON) {

  var topTracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(topTracks);
  var streams = extractPopularity(topTracks);
  var data = chartData(names, streams);
  var barctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(barctx).Bar(data);
  var linectx = document.getElementById("line-chart").getContext("2d");
  new Chart(linectx).Line(data);

}
