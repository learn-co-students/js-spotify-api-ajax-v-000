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


function extractTop10Tracks(tracks) {
  return tracks;
  // your code here
}

function extractPopularity(tracks) {
  var popularityArray = [];
  for (var i = 0, len = tracks.length; i < len; i++) {
    popularityArray.push(tracks[i].popularity);
  }
  return popularityArray;
}

function extractNames(tracks) {
  var nameArray = [];
  for (var i = 0, len = tracks.length; i < len; i++) {
    nameArray.push(tracks[i].name);
  }
  return nameArray;
}

function chartData(labels, inputData) {
  // your code here
var obj = {};
obj.labels = labels;
obj.datasets = [
  {
    fillColor: 'rgba(220,220,220,0.5)',
    strokeColor: 'rgba(220,220,220,0.8)',
    highlightFill: 'rgba(220,220,220,0.75)',
    highlightStroke: 'rgba(220,220,220,1)',
    data: inputData
  }
];

return obj;

}

function getSpotifyTracks(callback){

  $.ajax({
     url: url,
     success: function(result) {
        callback(result);
      }
   });
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var data = chartData(names, popularity);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  new Chart(ctx).Bar(data);

}
