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
  tracksArr = [];
  $.each(tracks, function(i, v){
    tracksArr.push(v);
  });
  return tracksArr;
}

function extractPopularity(tracks) {
    var pop = [];
    $.each(tracks, function(i, v){
      pop.push(v['popularity']);
    });
    return pop;
}

function extractNames(tracks) {
    var names = [];
    $.each(tracks, function(i, v){
      names.push(v['name'])
    });
    return names;
}

function chartData(labels, inputData) {
  var data = {
    labels: labels,
    datasets:[{ fillColor: 'rgba(255, 0, 0, 0.3)', 
      strokeColor: 'rgba(220,220,220,0.8)', 
      highlightFill: 'rgba(220,220,220,0.75)', 
      highlightStroke: 'rgba(220,220,220,1)',
      data: inputData
    }]
  }
  return data
}

function getSpotifyTracks(callback){

  var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(data){
      callback(data);
    }
  });
}

function success(parsedJSON) {
  var tracks_arr = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks_arr[0]);
  var pop = extractPopularity(tracks_arr[0]);
  var data = chartData(names, pop);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  new Chart(ctx).Bar(data);
}
