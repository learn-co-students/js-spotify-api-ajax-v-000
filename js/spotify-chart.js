var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};
$(document).ready(function() {
    getSpotifyTracks(success);
});

function extractTop10Tracks(tracks) {
  return tracks;
}

function extractPopularity(tracks) {
  var trackPopular =
    $.map(tracks, function(track, index) {
      return track.popularity;
    });

  return trackPopular;
}

function extractNames(tracks) {
  var trackNames = $.map(tracks, function(track, index) {
    return track.name;
  });
  return trackNames;
}

function chartData(labels, inputData) {
  var data = {};
  data["labels"] = labels;
  data["datasets"] = [];
  data["datasets"].push(dataSetProperties);
  data["datasets"][0]["data"] = inputData;
  return data;

}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'JSON',
    success: function(response) {
      return success(response);
  }
  });
}

function success(parsedJSON) {
      extractTop10Tracks(parsedJSON["tracks"]);
        extractNames(parsedJSON["tracks"]);
        extractPopularity(parsedJSON["tracks"]);
        var data = chartData(extractNames(parsedJSON["tracks"]), extractPopularity(parsedJSON["tracks"]));
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myChart = new Chart(ctx).Bar(data);
}
