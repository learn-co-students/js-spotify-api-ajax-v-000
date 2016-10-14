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
  return tracks.tracks;
}

function extractPopularity(tracks) {
  var popularity = [];
  $.each(tracks, function(index, track) {
    popularity.push(track.popularity);
  });
  return popularity;
}

function extractNames(tracks) {
  var names = [];
  $.each(tracks, function(index, track) {
    names.push(track.name);
  });
  return names;
}

function chartData(labels, inputData) {
  // your code here
  var data = {
    labels: labels,
    datasets: [
        {
            label: "Ten most popular songs for Elivs Presley",
            fillColor: 'rgba(220,220,220,0.5)', 
            strokeColor: 'rgba(220,220,220,0.8)', 
            highlightFill: 'rgba(220,220,220,0.75)', 
            highlightStroke: 'rgba(220,220,220,1)',
            data: inputData
        }
    ]
};
return data;
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

 $.ajax({url: url, success: callback});
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  var tracks =  extractTop10Tracks(parsedJSON);
  var labels = extractNames(tracks);
  var data = extractPopularity(tracks);
  var results = chartData(labels, data);

  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(results, dataSetProperties);
}
