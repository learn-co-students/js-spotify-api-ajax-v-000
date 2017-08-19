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
  return tracks.slice(0, 10);
}

function extractPopularity(tracks) {
  // your code here
  return tracks.map(function (track) {
    return track.popularity;
  })
}
  
function extractNames(tracks) {
  // your code here
  return tracks.map(function (track) {
    return track.name;
  })
}

function chartData(labels, inputData) {
  // your code here
  // use the dataSetProperties variable defined above if it helps
  return {
    labels: labels,
    datasets: [{
      fillColor: dataSetProperties.fillColor,
      strokeColor: dataSetProperties.strokeColor,
      highlightFill: dataSetProperties.highlightFill,
      highlightStroke: dataSetProperties.highlightStroke,
      data: inputData
    }]
  };
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  $.ajax({
    url: url,
    success: callback
  });
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  var tracks = extractTop10Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);


  var data = chartData(names, popularity);
  
  var ctx = $('#spotify-chart').get(0).getContext("2d");;

  var myChart = new Chart(ctx).Bar(data);
}
