var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

//$(document).ready(getSpotifyTracks);
//$(document).ready(testy);

$(function() {
    getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  //your code here
  return tracks.slice(0, 10); 
}

function extractPopularity(tracks) {  // better to use map method for these two functions
  // your code here
  var myTracks = tracks 
  var myList = [];
  myTracks.forEach(function(element){
    myList.push(element.popularity);
  })
  return myList;
}


function extractNames(tracks) {
  // your code here
  var myTracks = tracks 
  var myList = [];
  myTracks.forEach(function(element){
    myList.push(element.name);
  })
  return myList;
}


function chartData(labels, inputData) {
  //console.log(labels, inputData)
  //your code here
  //use the dataSetProperties variable defined above if it helps
  var dsp = dataSetProperties;

  var dataObj = {};
  dataObj.labels = labels;
  dataObj.datasets = [
    {
      fillColor:  dsp.fillColor,
      strokeColor: dsp.strokeColor,
      highlightFill: dsp.highlightFill,
      highlightStroke: dsp.highlightStroke,
      data: inputData
    }
  ];

  return dataObj;

} // "official" solution, which doesn't follow standard conventions in the chart.js documentation  

//   var ctx = $("#spotify-chart").get(0).getContext("2d");
//   var dsp = dataSetProperties;
  
//   var barData = {
//     labels: labels,
//     datasets: [
//       {
//         label: "Popularity",
//         fillColor:  dsp.fillColor,
//         strokeColor: dsp.strokeColor,
//         highlightFill: dsp.highlightFill,
//         highlightStroke: dsp.highlightStroke,


//         data: inputData
//       }
//     ]
//   }
//   new Chart(ctx).Bar(barData);

// } // end of alt version, which works like a charm, but doesn't pass tests

//original version, which follows specs and documentation to the letter (or so I thought); fails tests, and doesn't render to boot
//   var canvas = document.getElementById("spotify-chart");
//   var ctx = canvas.getContext("2d");
//   var dsp = dataSetProperties;
//   var myChart = new Chart(ctx, { //window.myChart or var myChart? Nobody knows...
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: 'Popularity',
//         data: inputData,
//         fillColor: dsp.fillColor,
//         strokeColor: dsp.strokeColor,
//         highlightFill: dsp.highlightFill, 
//         highlightStroke: dsp.highlightStroke,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       legend: {
//         position: 'top',
//       },
//     }
//   });
// }

function getSpotifyTracks(callback){
//   // your ajax call here, on success it should call on the 
//   // parameter it's passed (it's a function), and pass its 
//   // parameter the data it received

//   //use the url variable defined above if it helps
//   $.get(url).success(callback); // this is my alternate version, based on first part of Avi's video



// // My original solution, which passes already parsed json ("tracks") to success
//   // $.ajax({
//   //   type: 'get',
//   //   url: url,
//   //   data: 'data',
//   //   dataType: "JSON",

//   //   }).done(function(data) {
//   //   var alb = data.tracks;
//   //   success(alb);
//   //   })


//   //}).fail(function(){
//     //console.log("Something's broken!");
//   //})
// }


  $.ajax({
    url: url,
    success: function(result) {
      callback(result);
    }
  });
} // the official solution

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks (typo?)
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  

    var tracklist = extractTop10Tracks(parsedJSON.tracks);
    var names = extractNames(tracklist);
    var popularity = extractPopularity(tracklist);

    var data = chartData(names, popularity); 
    var ctx = document.getElementById("spotify-chart").getContext("2d");
    new Chart(ctx).Bar(data);

}








