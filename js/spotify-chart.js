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
  return $.map(tracks,function(track){
    return track.popularity;
  });
}

function extractNames(tracks) {
  return $.map(tracks,function(track){
    return track.name;
  });
}

function chartData(labels, inputData) {
  dataSetProperties["data"] = inputData;
  data = {
    labels: labels,
    datasets:[dataSetProperties]
  }
  return data;
}

function getSpotifyTracks(callback){
  return $.ajax({
    url: url,
    dataType: 'json',
    success:function(result){
      callback(result);
    }
  });    
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var data = chartData(names,popularity);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
