var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = [
{
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
}
];


var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,22 0,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

// $(document).ready(function() {
// });

function extractTop10Tracks(tracks) {
  // your code here
  // return $(tracks).slice(0, 10);
  return tracks;
}

function extractPopularity(tracks) {
  // your code here
  var popularityArr = tracks.map(function(obj) {
    return obj.popularity;
  });
  return popularityArr;
}

function extractNames(tracks) {
  // your code here
  var namesArr = tracks.map(function(obj) {
    return obj.name;
  });
  return namesArr;
}

function chartData(labels, inputData) {
  // your code here
  data.labels = labels;
  dataSetProperties[0].data = inputData;
  data.datasets = dataSetProperties;
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
  }).success(callback);
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  // debugger;
  var topTen = extractTop10Tracks(parsedJSON);
  var nameTen = extractNames(topTen.tracks);
  var popTen = extractPopularity(topTen.tracks);
  chartData(nameTen, popTen);
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
