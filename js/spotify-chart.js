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
  // your code here
  return tracks;

}

function extractPopularity(tracks) {
  // your code here
  var newTracks = [];
  $.each(tracks, function(index, track){
     newTracks.push(track['popularity']);
   })
   return newTracks;
}

function extractNames(tracks) {
  // your code here
  var newTracks = [];
  $.each(tracks, function(index, track){
     newTracks.push(track['name']);
   })
   return newTracks;
}

function chartData(labels, inputData) {
  // your code here

  const data = {labels:[], datasets:[]};
  data['labels'] = labels;

  data['datasets']=[
    {
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: inputData
    }];
  //debugger;
  return data;

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  //debugger;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: callback
});
}

function success(parsedJSON) {
  //debugger;
  var tracks = extractTop10Tracks(parsedJSON.tracks)
  var labels = extractNames(tracks);
  var popularities = extractPopularity(tracks);
  var data = chartData(labels, popularities)
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(ctx).Bar(data);

  //debugger;
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
