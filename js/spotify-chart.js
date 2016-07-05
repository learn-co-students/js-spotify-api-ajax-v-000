var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)',
  data: ''
};


$(function() {
  getSpotifyTracks(success);

});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks;
}

function extractPopularity(tracks) {
  return tracks.map(function(track) {
    return track.popularity;
  });


}

function extractNames(tracks) {
  return tracks.map(function(track) {
    return track.name;
  });
}

function chartData(labels, inputData) {
  dataSetProperties.data = inputData;
  var chartInfo = {
    labels:labels,
    datasets: [dataSetProperties]
  };
  return chartInfo;
}

function getSpotifyTracks(){

return $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    success: function(response) {
      return response;
    },
    error: function(error) {
      console.log(error);
    }
  }).done(function(response) {
    success(response.tracks);
  });

}

function success(parsedJSON) {

  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart

  var labels = extractNames(extractTop10Tracks(parsedJSON));
  var popularity = extractPopularity(extractTop10Tracks(parsedJSON));


    var ctx = $("#spotify-chart").get(0).getContext("2d");
    

    myBarChart = new Chart(ctx, {
      type: 'bar',
      data: chartData(labels, popularity)
      });



  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
