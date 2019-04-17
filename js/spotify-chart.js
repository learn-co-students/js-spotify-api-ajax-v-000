var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

$(function() {
  getSpotifyTracks(success);
});

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  var popularTracks =[]
  for(var i=0; i < tracks.length; i++) {
    popularTracks.push(tracks[i].popularity);
  }
  return popularTracks;
}

function extractNames(tracks) {
  var nameTracks =[]
  for(var i=0; i < tracks.length; i++) {
    nameTracks.push(tracks[i].name);
  }
  return nameTracks;
}

function chartData(labels, inputData) {
  var data = {};
  data.labels = labels;
  data.datasets = [
      {
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data: inputData
      }
  ];
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
    var tracks = extractTop10Tracks(parsedJSON.tracks);
    var names = extractNames(tracks);
    var streams = extractPopularity(tracks);
    var data = chartData(names, streams);
    var ctx = document.getElementById("spotify-chart").getContext("2d");
    // new Chart(ctx, {
    // type: 'bar',
    // data: data
    // });
    new Chart(ctx).Bar(data);

}
