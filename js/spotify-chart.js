$(document).ready(function(){
  getSpotifyTracks(success);
});

// $(function() {
//
// });

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  var topTen = tracks.slice(0,10);
  return topTen;
}

function extractPopularity(tracks) {
  // your code here
  var popularity = tracks.map(function(track, index){
    return track.popularity;
  });

  return popularity;
}

function extractNames(tracks) {
  // your code here
  var names = tracks.map(function(track, index){
    return track.name;
  });

  return names;
}

function chartData(labels, inputData) {
  // your code here

  // use the dataSetProperties variable defined above if it helps
  var data = {
    labels: labels,
    datasets: [
      {
        label: 'Popularity',
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: inputData
      }
    ]
  }

  return data;
}

function getSpotifyTracks(callback){
  var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.getJSON(url, function(response){
    callback(response);
  });
}

function success(parsedJSON) {
  var tracks = parsedJSON.tracks;
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
    var topTen = extractTop10Tracks(tracks);
  //  2. extractNames -  pass it the result of #1
    var names = extractNames(topTen);
  //  3. extractPopularity - pass it the result of #1
    var popularity = extractPopularity(topTen);
  //  4. chartData - pass it results of #2 and #3
    var data = chartData(names, popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
    var spotifyChart = new Chart(ctx).Bar(data);

    return spotifyChart;
}
