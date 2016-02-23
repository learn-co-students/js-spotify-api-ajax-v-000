var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0,20);
}

function extractNumberOfStreams(tracks) {
  numArray = [];
  for(var i=0;i<tracks.length;i++){
    numArray.push(tracks[i].num_streams);
  }
  return numArray;
}

function extractNames(tracks) {
  nameArray = [];
  for(var i=0;i<tracks.length;i++){
    nameArray.push(tracks[i].track_name);
  }
  return nameArray;
}

function chartData(labels, inputData) {
  dataSetProperties.data = inputData;
  return { labels: labels, datasets: [dataSetProperties] };
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(response){
      callback(response);
    }
  })
}

function success(parsedJSON) {
  var tracks = extractTop20Tracks(parsedJSON.tracks);
  var labels = extractNames(tracks);
  var streams = extractNumberOfStreams(tracks);
  var data = chartData(labels, streams);
  var ctx = $('#spotify-chart')[0].getContext('2d');
  return new Chart(ctx).Bar(data, {});
}
