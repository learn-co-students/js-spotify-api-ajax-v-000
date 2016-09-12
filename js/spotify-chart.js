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
  var arrayOfTracks = tracks["tracks"];
  return arrayOfTracks;
}

function extractPopularity(tracks) {
  var popularityOfTracks = [];
  for (var i = 0; i < tracks.length; i++) {
    var popularity = tracks[i]["popularity"];
    popularityOfTracks.push(popularity);
  }
  return popularityOfTracks;
};

function extractNames(tracks) {
  var trackNames = [];
  for (var i = 0; i < tracks.length; i++) {
    var name = tracks[i]["name"];
    trackNames.push(name);
  }
  return popularityOfTracks;
};

function chartData(labels, inputData) {
  var barData = {
    labels: labels,
    datasets: dataSetProperties
  };
  barData["datasets"]["data"] = inputData
  return barData;
}

function getSpotifyTracks(callback){
    $.ajax({
      url: url,
      method: "GET"
    }).done(callback(response) {
      return response;
    })
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  var tracks = extractTop10Tracks(parsedJSON)
  //  2. extractNames -  pass it the result of #1
  var trackNames = extractNames(tracks)
  //  3. extractPopularity - pass it the result of #1
  var trackPopularities = extractPopularity(tracks)
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(trackNames, trackPopularities)
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = $('#spotify-chart');
  //  6. make a new bar chart!
  var chart = new Chart(ctx).Bar(data)
};
