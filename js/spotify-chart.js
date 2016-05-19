var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks( success );
});

function extractTop10Tracks( tracks ) {
  return tracks.slice( 0, 10 );
}

function extractPopularity( tracks ) {
  note = [];

  for (var i = 0; i < tracks.length; i++) {
    note.push( tracks[i].popularity );
  }

  return note
}

function extractNames(tracks) {
  memo = [];

  for (var i = 0; i < tracks.length; i++) {
    memo.push( tracks[i].name )
  }
  return memo;
}

function chartData( labels, inputData ) {
  var memo = {
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
  return memo;

}

function getSpotifyTracks(callback){

  $.ajax( { url: url } )
    .done( function ( responseData ) {
      callback( responseData )
    } );
}

function success( parsedJSON ) {
  var tracks = parsedJSON.tracks
  var top10 = extractTop10Tracks( tracks );
  var names = extractNames( tracks );
  var popularity = extractPopularity( tracks );
  var data = chartData( names, popularity );
  var ctx = $( '#spotify-chart' ).get(0).getContext( '2d' );
  var barChart = new Chart( ctx ).Bar( data );
}
