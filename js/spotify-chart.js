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

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.splice(0,10);
}

function extractPopularity(tracks) {
  return tracks.map( function(track){ return track.popularity });
}

function extractNames(tracks) {
  return tracks.map( function(track){ return track.name });
}

function chartData(labels, inputData) {
  // your code here
  var data = {
    labels: labels,
    datasets: [
    {
      fillColor: dataSetProperties.fillColor,
      strokeColor: dataSetProperties.strokeColor,
      highlightFill: dataSetProperties.highlightFill,
      highlightStroke: dataSetProperties.highlightStroke,
      data: inputData
    }]
  };
  return data;

  // use the dataSetProperties variable defined above if it helps
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
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(names, popularity);  
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  //  6. make a new bar chart!
  var myNewChart = new Chart(ctx).Bar(data);
}
