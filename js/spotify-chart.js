var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  //could set up hashes for each track to store names and popularity?
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  // your code here
  var inputData = [];
  for (var i = 0; i < tracks.length; i++) {
    inputData.push(tracks[i].popularity);
  }
  return inputData;
}

function extractNames(tracks) {
  // your code here
  var labels = [];
  for (var i = 0; i < tracks.length; i++) {
    labels.push(tracks[i].name);
  }
  return labels;
}

function chartData(labels, inputData) {
  // your code here

  // use the dataSetProperties variable defined above if it helps
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
  }
  return data
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  }).done(function(response) {
    callback(response);
  });
}

function success(parsedJSON) {
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
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var labels = extractNames(tracks);
  var inputData = extractPopularity(tracks);
  var data = chartData(labels, inputData);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var barChart = new Chart(ctx).Bar(data);
}
