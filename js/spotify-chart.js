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

function getSpotifyTracks(callback){

return $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    success:function(response) {
      return callback(response);
    },
    error: function(error) {
      console.log(error);
    }
  })
}

function success(parsedJSON) {
debugger;
 // this function will make a new bar chart, refer to this url:
 // http://www.chartjs.org/docs/#bar-chart

 var labels = extractNames(extractTop10Tracks(parsedJSON.tracks));
 var popularity = extractPopularity(extractTop10Tracks(parsedJSON.tracks));
 var data = chartData(labels, popularity);
 var ctx = $("#spotify-chart").get(0).getContext("2d");
 var myBarChart = new Chart(ctx).Bar(data);
}
