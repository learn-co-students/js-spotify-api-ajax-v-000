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


function extractTop10Tracks(json) {
  return json.tracks.slice(0,10);
}

function extractPopularity(tracks) {
  return tracks.map(function(track){
  return  track['popularity'];
  })
}

function extractNames(tracks) {
  var arr = []
  for (i = 0; i < tracks.length; i++) {
    arr.push(tracks[i].name);
  };
return arr;
}


function getSpotifyTracks(callback){
  $.get(url).success(callback);
};

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var streams = extractPopularity(tracks);
  var data = chartData(names, streams);
  // var ctx = document.getElementById("spotify-chart").getContext("2d");
  // new Chart(ctx).Bar(data);
}


function chartData(labels, inputData) {
  var data = {}
  data.labels = labels;
  data.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }];
  return data;
}
