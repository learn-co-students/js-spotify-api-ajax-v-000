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
  return tracks.tracks;
}

function extractPopularity(tracks) {
  // your code here
  var a = [];
  $.each(tracks, function(index, track) {
    a.push(track.popularity);
  })

  return a;
}

function extractNames(tracks) {
  var a = [];
  $.each(tracks, function(index, track) {
    a.push(track.name);
  })
  return a;
}

function chartData(labels, inputData) {
  // your code here
  var data = {
    labels: labels,
    datasets: [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        label: "Elvis Presley",
        data: inputData,
      }]
  };
  return data;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      callback(response);
      return response;
    }
  }
  })
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var options = {
    scales: {
      xAxes: [{
       stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var cData = chartData(names, popularity);
  var ctx = document.getElementById("spotify-chart").getContext("2d");;
  var myFirstChart = new Chart(ctx).Bar(cData, options);
}
// $(document).ready(function(){
//   getSpotifyTracks();
// });
