$(document).ready(function() {
  getSpotifyTracks(success);
});

var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

function extractTop10Tracks(data) {
  return data.tracks;
}

function extractPopularity(tracks) {
    var pop = [];
    $.each(tracks, function(index,track) {
      pop.push(track.popularity);
    });
    return pop;
}

function extractNames(tracks) {
    names = []
    $.each(tracks, function(index, track) {
      names.push(track.name);
    });
    return names;
}

function chartData(labels, inputData) {
  var data = {
      labels: labels,
      datasets: [{
        label: 'Popularity',
        data: inputData,
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)'
      }]
    };
    return data;
  };


function getSpotifyTracks() {
  $.ajax({
    url: "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=US",
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      success(data)}
    });
  }



function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON)
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var data = chartData(names, popularity);
  var ctx = document.getElementById('spotify-chart').getContext('2d');
  new Chart(ctx).Bar(data);
}
