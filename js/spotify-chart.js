var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks['tracks'];
}

function extractPopularity(tracks) {
  return tracks.map(function(track){
    return track['popularity'];
  });
}

function extractNames(tracks) {
  return tracks.map(function(track){
    return track['name'];
  });
}

function chartData(labels, inputData) {
  // your code here
  return {
    type: 'bar',
      labels: labels,
      datasets: [
      {
         label: "Presley Songs",
         fillColor: 'rgba(220,220,220,0.5)', 
         strokeColor: 'rgba(220,220,220,0.8)', 
         highlightFill: 'rgba(220,220,220,0.75)', 
         highlightStroke: 'rgba(220,220,220,1)',
         data: inputData
      }]
    }
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  $.get(url).done(success)
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
      tracks = extractTop10Tracks(parsedJSON);
      names = extractNames(tracks);
      popularity = extractPopularity(tracks);
      data = chartData(names, popularity);
      var ctx = document.getElementById("spotify-chart").getContext('2d');
      new Chart(ctx, data);

      console.log(names)
      console.log(popularity)
      console.log(data)
      console.log("This is the end my friend")
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
