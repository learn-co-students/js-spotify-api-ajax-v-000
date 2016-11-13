var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

function extractTop10Tracks(top10Tracks) {
  return top10Tracks;
}//end extractTop10Tracks

function extractPopularity(tracks) {
  var popularity = [];

  $.each(tracks, function(i, track){
    popularity.push(track.popularity);
  })
  return popularity;
}//end extractPopularity

function extractNames(tracks) {
  var names = [];

  $.each(tracks, function(i, track){
    names.push(track.name);
  })
  return names;
}//end extractNames


function chartData(labels, popularity) {
  var chart = {};

  chart.labels = labels;
  chart.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: popularity
  }];

  return chart;
}//end chartData

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: "GET",
    success: function(response){
      success(response)
    }
  });//end ajax
}//end getSpotifyTracks

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var data = chartData(
    extractNames(tracks),
    extractPopularity(tracks)
  );
  var ctx = document.getElementById("spotify-chart").getContext("2d");

  new Chart(ctx).Bar(data);
}//end success

$(function() {
  getSpotifyTracks(success);
});
