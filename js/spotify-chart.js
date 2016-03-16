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
  return tracks.slice(0, 10)
}

function extractPopularity(tracks) {
  var array = []
  for (index = 0; index < tracks.length; index++) {
    array.push(tracks[index]["popularity"]);
  };
  return array;
}

function extractNames(tracks) {
  var array = []
  for (index = 0; index < tracks.length; index++) {
    array.push(tracks[index]["name"]);
  };
  return array;
}

function chartData(labels, inputData) {
  var chartData = {
    labels: labels,
    datasets: [
        {
          fillColor: 'rgba(220,220,220,0.5)', 
          strokeColor: 'rgba(220,220,220,0.8)', 
          highlightFill: 'rgba(220,220,220,0.75)', 
          highlightStroke: 'rgba(220,220,220,1)',
          data: inputData
        }
    ]
  };
  return chartData;
}

function getSpotifyTracks(callback){
  $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
         success(data);
      } 
  });
}

function success(parsedJSON) {
  // console.log(parsedJSON.tracks)
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  // console.log(tracks);
  var names = extractNames(tracks);
  // console.log(names);
  var popularity = extractPopularity(tracks);
  // console.log(streams);
  var data = chartData(names, popularity);
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  new Chart(ctx).Bar(data);
}
