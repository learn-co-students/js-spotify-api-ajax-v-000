var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(36,182,67,0.7)', 
  strokeColor: 'rgba(36,182,67,0.8)', 
  highlightFill: 'rgba(103,0,251,0.75)', 
  highlightStroke: 'rgba(103,0,251,1)',
};

$(function() {
  getSpotifyTracks(success);
});


function extractTop10Tracks(tracks) {
  return tracks.slice(0,10)
}

function extractPopularity(tracks) {
  return tracks.map(function(track){return track.popularity})
}

function extractNames(tracks) {
  return tracks.map(function(track){return track.name})
}

function chartData(labels, inputData) {
  
  var data = {
    labels: labels,
    datasets: [{
     fillColor: dataSetProperties.fillColor,
     strokeColor: dataSetProperties.strokeColor,
     highlightFill: dataSetProperties.highlightFill,
     highlightStroke: dataSetProperties.highlightStroke,
     data: inputData
    }]
  };
  return data;
}


function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    success: function(data) {
      callback(data);
    }
  });
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  //  1. extractTop20Tracks 
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  //  2. extractNames -  pass it the result of #1
  var names = extractNames(tracks);  
  //  3. extractPopularity - pass it the result of #1
  var popularity = extractPopularity(tracks);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(names, popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  var ctx = $('#spotify-chart').get(0).getContext('2d')
  //  6. make a new bar chart!
  new Chart(ctx).Bar(data);
}


















