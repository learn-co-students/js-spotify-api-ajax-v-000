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
  return tracks.slice(0, 10);
};

function extractPopularity(tracks) {
  return tracks.map(function(track) {
    return track.popularity
  });
};

function extractNames(tracks) {
  return tracks.map(function(track) {
    return track.name
  });
};

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
  };
  return data;
};

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(response) {
      callback(response);
    }
  })
};

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON)
  var names = extractNames(tracks)
  var popularity = extractPopularity(tracks)
  var data = chartData(names, popularity)
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  // var myBarChart = new Chart(ctx).Bar(data, options);
  var myBarChart = new Chart(ctx).Bar(data, dataSetProperties);
  console.log(tracks);
};
