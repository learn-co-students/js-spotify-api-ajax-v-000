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

//Step 1. get the parsed JSON
function getSpotifyTracks(callback){

  $.ajax({
    url: url,
    success: function( result ) {
      //if successful, look for the function success(result)
      callback( result );
    }
  } );
  //
  // $.ajax( { url: url } )
  //   .done( function ( responseData ) {
  //     console.log(callback(responseData));
  //     callback( responseData )
  //   } );
}

//Step 2. retrieve the desired info from the JSON
function success( parsedJSON ) {
  //1. retrieve the array of 10 JSON objects
  var tracks = parsedJSON.tracks
  //2. retrieve the 10 tracks by slice
  var top10 = extractTop10Tracks( tracks );
  //3. iterate over each track and retrieve name
  var names = extractNames( tracks );
  //4. iterate over each track and retrieve popularity
  var popularity = extractPopularity( tracks );
  //5. input the chart data per Chart.js instructions
  var data = chartData( names, popularity );
  console.log(tracks);
  //var ctx = document.getElementById("spotify-chart").getContext("2d");
  //6. get context of canvas per Chart.js instructions
  var ctx = $( '#spotify-chart' ).get(0).getContext( '2d' );
  //7. instantiate the Chart class on the canvas, and Chart.js does the rest
  var barChart = new Chart( ctx ).Bar( data );
}