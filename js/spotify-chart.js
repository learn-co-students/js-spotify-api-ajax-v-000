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
  var ans = []
  for (var i = 0; i < 10; i++) {
    ans.push(tracks[i])
  }
  return ans
}

function extractPopularity(tracks) {
  // your code here
  var ans = []
  for (i in tracks) {
    ans.push(tracks[i].popularity)
  }
  return ans
}

function extractNames(tracks) {
  // your code here
  var ans = []
  for (i in tracks) {
    ans.push(tracks[i].name)
  }
  return ans
}

function chartData(labels, inputData) {
  // your code here
  var ans = {};
  ans['labels'] = labels
  dataSetProperties = {
    fillColor: 'rgba(220,220,220,0.5)', 
    strokeColor: 'rgba(220,220,220,0.8)', 
    highlightFill: 'rgba(220,220,220,0.75)', 
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  } 
  ans['datasets'] = [dataSetProperties]
  return ans
  // use the dataSetProperties variable defined above if it helps
}

function test(response) {
  console.log('success!')
}

// Elvis id = 43ZHCT0cAZBISjO8DG9PnE
function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received
  // use the url variable defined above if it helps
  var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'JSON',
    success: callback
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
  var tracks = extractTop10Tracks(parsedJSON.tracks)
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var data = chartData(names, popularity);
  var ctx = $('#spotify-chart')
  var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data
  });
}
