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
  return tracks.slice(0,10);
}

function extractPopularity(tracks) {
  // your code here
  var popArray = [];
  $.each(tracks, function(index, track) {
    popArray.push(track.popularity);
  });
  return popArray;
}

function extractNames(tracks) {
  // your code here
  var nameArray = [];
  $.each(tracks, function(index, track) {
    nameArray.push(track.name);
  });
  return nameArray;
}

function chartData(labels, inputData) {
  // your code here
  var chartObject = {};
  chartObject['labels'] = labels;
  chartObject['datasets'] = [];
  $.each(labels, function(index, label) {
    chartObject['datasets'][index] = {};
    chartObject['datasets'][index]['label'] = label;
    chartObject['datasets'][index]['fillColor'] = dataSetProperties.fillColor;
    chartObject['datasets'][index]['strokeColor'] = dataSetProperties.strokeColor;
    chartObject['datasets'][index]['highlightFill'] = dataSetProperties.highlightFill;
    chartObject['datasets'][index]['highlightStroke'] = dataSetProperties.highlightStroke;
    chartObject['datasets'][index]['data'] = inputData;
  })
  return chartObject;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  $.when($.ajax({
    'url': url,
    'type': 'GET'
  })).then(function(data) {
    callback(data);
  });
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  var topTracks = extractTop10Tracks(parsedJSON.tracks);
  var trackNames = extractNames(topTracks);
  var trackPopularity = extractPopularity(topTracks);
  var dataForChart = chartData(trackNames, trackPopularity);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(dataForChart);
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
