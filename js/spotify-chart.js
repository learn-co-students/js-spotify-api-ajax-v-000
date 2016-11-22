var url = "https://api.spotify.com/v1/artists/0bxHci3JIhhKA53n8rH3tT/top-tracks?country=SE";

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
  var popularTracks = [];
  for (var i = 0; i < tracks.length; i++) {
    popularTracks.push(tracks[i].popularity);
  }
  return popularTracks;
}

function extractNames(tracks) {
  // your code here
  var trackNames = [];
  for (var i = 0; i < tracks.length; i++) {
    trackNames.push(tracks[i].name);
  }
  return trackNames;
}

function chartData(names, popularity) {
  // your code here
  var data = {
    labels: names,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: popularity
        }
    ]
};
  // use the dataSetProperties variable defined above if it helps
  return data;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(result) {
      callback(result);
    }
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
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  //  2. extractNames -  pass it the result of #1
  var names = extractNames(tracks);
  //  3. extractPopularity - pass it the result of #1
  var popularity = extractPopularity(tracks);
  //  4. chartData - pass it results of #2 and #3
  var data = chartData(names, popularity);
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  //  6. make a new bar chart!
  var myBarChart = new Chart(ctx).Bar(data);
}