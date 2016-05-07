var elvis_url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=US";

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,10);
}

function extractPopularity(tracks) {
  return $.map(tracks, function(track, index){
    return track['popularity'];
  });
}

function extractNames(tracks) {
  return $.map(tracks, function(track, index){
    return track['name'];
  });
}

function chartData(labels, inputData) {

  var dataParams = {};
  
  dataParams.labels = labels;
  dataParams.datasets = [{
    fillColor: 'rgba(220,220,220,0.5)', 
    strokeColor: 'rgba(220,220,220,0.8)', 
    highlightFill: 'rgba(220,220,220,0.75)', 
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }];

  return dataParams;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received
  $.ajax({
    url:elvis_url,
    success: function(response){
      callback(response);
    }
  });

  // use the url variable defined above if it helps
}

function success(JSONdata) {
  var tracks = extractTop10Tracks(JSONdata.tracks);
  var names = extractNames(JSONdata.tracks);
  var popules = extractPopularity(JSONdata.tracks);
  var data = chartData(names, popules);

  var ctx = document.getElementById('spotify-chart').getContext('2d');
  var myBarChart = new Chart(ctx).Bar(data);
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
