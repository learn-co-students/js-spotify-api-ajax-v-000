var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  // alert('ready');
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,10);
}

function extractPopularity(tracks) {
  var numOfStreams = [];
  for (var i = 0; i < tracks.length; i ++) {
    numOfStreams.push(tracks[i].popularity);
  };
  return numOfStreams;
};

function extractNames(tracks) {
  var songNames = [];
  for (var i = 0; i < tracks.length; i ++) {
    songNames.push(tracks[i].name);
  }
  console.log(songNames);
  return songNames;
}

function chartData(labels, inputData) {
  var data = {
    'labels': labels,
    'datasets': [{
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
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // console.log(data); <<< CONSOLE LOG IS YOUR BEST FRIEND. Developer Tools make sense finally. 
      callback(data);
    }
  })
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
  var topTen = extractTop10Tracks(parsedJSON.tracks);
  // parsedJSON.tracks is important. It makes an array of tracks, not simply the raw objects.
  var popularity = extractPopularity(topTen);
  var names = extractNames(topTen);
  var charted = chartData(names, popularity);
  var ctx = document.getElementById('spotify-chart').getContext('2d');
  var spotifyChart = new Chart(ctx).Bar(charted);
}
