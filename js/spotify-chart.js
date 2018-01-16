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
  return tracks
  // your code here
}

function extractPopularity(tracks) {
  var names = []
  for (i = 0; i < tracks.length; i ++) {
    names.push(tracks[i].popularity)

  }
  return names
  // your code here
}

function extractNames(tracks) {
  var names = []
  for (i = 0; i < tracks.length; i ++) {
    names.push(tracks[i].name)

  }
  return names
  // your code here
}

function chartData(labels, inputData) {
  var matches = {}
  matches['labels'] = labels

  matches['datasets'] = [ {
  label: 'Top 10 Hits of Elvis',
   fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)',
  data: inputData }
  ]
  return matches
  // your code here

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  var songData = {}
  $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {

      return success(data.tracks)
    }
  })

  
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
var top10 = extractTop10Tracks(parsedJSON)
var names = extractNames(top10)
var pop = extractPopularity(top10)
var cdata = chartData(names, pop)
 

var ctx = $("#spotify-chart").get(0).getContext("2d");
new Chart(ctx).Bar(cdata)

    


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
