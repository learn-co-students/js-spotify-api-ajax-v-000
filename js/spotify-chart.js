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

  var trackNames = $.map(tracks, function(track, index) {
    return track.name
  })
  return trackNames
}


function extractPopularity(tracks) {
  var popArray = tracks.map(function(track, index){
    return track.popularity
  })
  return popArray
}

function extractNames(tracks) {
  var namesArray = tracks.map(function(track, index){
    return track.name
  })
  return namesArray
}


function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets: [
        {
            // labgitel: "Ten most popular songs for Elvis Presley",
            fillColor: 'rgba(220,220,220,0.5)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: inputData,
        }
      ]
    }
  return data  
};


function getSpotifyTracks(callback){
  $.get(url, callback)
};

function success(parsedJSON) {

  var tracksObjs = parsedJSON["tracks"]
  var topTen = extractTop10Tracks(tracksObjs)
  var popArray = extractPopularity(tracksObjs)
  var chart = chartData(topTen, popArray)

  var ctx = new Chart(document.getElementById("spotify-chart").getContext("2d")).Bar(chart);

}
