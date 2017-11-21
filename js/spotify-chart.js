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
  return tracks.slice(0,10);
}

function extractPopularity(tracks) {
  return tracks.map(function(track){
    return track.popularity;
  });
}

function extractNames(tracks) {
  return tracks.map(function(track){
    return track.name;
  });
}

function chartData(labels, inputData) {
  // your code here
  return {
    labels: labels,
    datasets: [
      {
        fillColor: dataSetProperties.fillColor,
        strokeColor: dataSetProperties.strokeColor,
        highlightFill: dataSetProperties.highlightFill,
        highlightStroke: dataSetProperties.highlightStroke,
        data: inputData
      }
    ]
  };
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  console.log("get spotify")
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received
  $.ajax({url: url, success: success})
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  console.log("success");
  console.log(parsedJSON);
  var top10Tracks = extractTop10Tracks(parsedJSON.tracks);
  console.log("finished extractTop10Tracks");
  var names = extractNames(top10Tracks);
  console.log("finished extractNames");
  var popularities = extractPopularity(top10Tracks);
  console.log("finished Popularity");
  var data = chartData(names, popularities);
  console.log("finished chartData");
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  console.log("ctx:");
  console.log(ctx);
  var myBarChart = new Chart(ctx).Bar(data, {});
  console.log(myBarChart);
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