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

function extractTop10Tracks(trackInfoToParse) {
  // your code here
  var tracksArray = trackInfoToParse.tracks;
  return tracksArray;
}

function extractPopularity(tracks) {
  // your code here

  var popularities = [];

  $.each(tracks, function(index, track){
    popularities.push(track.popularity);
  })

  return popularities;
}

function extractNames(tracks) {
  // your code here
  var names = [];

  $.each(tracks, function(index, track){
    names.push(track.name);
  })

  return names;
}

function chartData(labels, inputData) {
  // your code here
  var data = {
    labels: labels,
    datasets: [{
      label: 'Popularity',
      fillColor: dataSetProperties['fillColor'],
      strokeColor: dataSetProperties['strokeColor'],
      highlightFill: dataSetProperties['highlightFill'],
      highlightStroke: dataSetProperties['highlightStroke'],
      data: inputData
    }]
  };

  return data;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    success: function(tracks) {
      success(tracks);
    },
    error: function(error) {
      $('#errors').html("I'm sorry, there's been an error. Please try again.");
    }
  })
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
  var tracks = extractTop10Tracks(parsedJSON);

  var extractedNames = extractNames(tracks);
  var extractedPopularities = extractPopularity(tracks);
  var data = chartData(extractedNames, extractedPopularities);

  var ctx = document.getElementById('spotify-chart').getContext('2d');

  new Chart(ctx).Bar(data);
}
