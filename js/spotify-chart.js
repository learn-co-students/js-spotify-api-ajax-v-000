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
    names.push(tracks[i].name);
  }
  return songNames;
}

function chartData(labels, inputData) {
  var songData = {};
  songData.labels = labels;
  songData.datasets = [
    {
      dataSetProperties,
      data: inputData
    }
  ];
  return songData;
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

  var topTracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(topTracks);
  var streams = extractNumberOfStreams(topTracks);
  var data = chartData(names, streams);
  var ctx = document.getElementByID("spotify-chart").getContext("2d");
  new Chart(ctx).bar(data);

}
