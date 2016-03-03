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
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  var extractedPopularity = [];
  $.each(tracks, function(index, track){
    extractedPopularity.push(track['popularity']);
  });
  return extractedPopularity;
}

function extractNames(tracks) {
  var extractedNames = [];
  $.each(tracks, function(index, track){
    extractedNames.push(track['name']);
  });
  return extractedNames;
}

function chartData(labels, inputData) {
  var dataToReturn = {};
  dataToReturn['labels'] = labels;
  dataToReturn['datasets'] = [{
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }];

  return dataToReturn;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    url: url,
    success: function(response) {
      callback(response);
    }
  });
}

function success(parsedJSON) {
  console.log(parsedJSON);
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  console.log(tracks);
  //  2. extractNames -  pass it the result of #1
  var names = extractNames(tracks);
  console.log(names);
  //  3. extractNumberOfStreams - pass it the result of #1
  var popularity = extractPopularity(tracks);
  console.log(popularity);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(names, popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  //  6. make a new bar chart!
  var spotifyBarChart = new Chart(ctx).Bar(data);
}