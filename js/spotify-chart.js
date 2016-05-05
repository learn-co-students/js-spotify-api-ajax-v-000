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
  return tracks;
  // the beauty of console.log is that it let's you see the objects returned in the browser console. 
  // turns out that tracks is already an array of the top 10 tracks, so this is almost needless.
}

function extractPopularity(tracks) {
  var numOfStreams = [];
  for(var i = 0; i > tracks.length; i ++) {
    numOfStreams.push(tracks[i].popularity);
  };
  return numOfStreams;
}

function extractNames(tracks) {
  // your code here
}

function chartData(labels, inputData) {
  // your code here

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
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
  var topTen = extractTop10Tracks(parsedJSON);
  var popularity = extractPopularity(topTen);
  console.log(popularity);
}
