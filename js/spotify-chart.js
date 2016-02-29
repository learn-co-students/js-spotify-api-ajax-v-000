var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  var numOfStreams = [];
  for (i = 0; i < tracks.length; i++) {
    numOfStreams.push(tracks[i].popularity);
  }
  return numOfStreams;
}

function extractNames(tracks) {
  var names = [];
  for (i = 0; i < tracks.length; i++) {
    names.push(tracks[i].name);
  }
  return names;
}

function chartData(labels, inputData) {
  var dataObj = {};
  dataObj.labels = labels;
  dataObj.datasets = [
    {
      fillColor: 'rgba(220,220,220,0.5)', 
      strokeColor: 'rgba(220,220,220,0.8)', 
      highlightFill: 'rgba(220,220,220,0.75)', 
      highlightStroke: 'rgba(220,220,220,1)', 
      data: inputData
    }
  ];
  return dataObj;
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
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var streams = extractPopularity(tracks);
  var data = chartData(names, streams);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(ctx).Bar(data);
}


