var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(document).ready(getSpotifyTracks);
//$(document).ready(testy);

// $(function() {
//     getSpotifyTracks();
// });

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  if (tracks.length == 10) {
    var top = tracks;
  }
  return top; 
}

function extractPopularity(tracks) {
  // your code here
  var myList = [];
  tracks.forEach(function(element){
    myList.push(element.popularity);
  })
  return(myList);
}

function extractNames(tracks) {
  // your code here
  var myList = [];
  tracks.forEach(function(element){
    myList.push(element.name);
  })
  return(myList);
}

function chartData(labels, inputData) {
  //console.log(labels, inputData)
  // your code here
  //use the dataSetProperties variable defined above if it helps
  var canvas = document.getElementById("spotify-chart").getContext("2d");
  var dsp = dataSetProperties;
  
  var barData = {
    labels: labels,
    datasets: [
      {
        fillColor:  dsp.fillColor,
        strokeColor: dsp.strokeColor,
        highlightFill: dsp.highlightFill,
        highlightStroke: dsp.highlightStroke,


        data: inputData
      }
    ]
  }
  new Chart(canvas).Bar(barData);
} // end of alt version


  // var canvas = document.getElementById("spotify-chart");
  // var ctx = canvas.getContext("2d");
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
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass its 
  // parameter the data it received

  // use the url variable defined above if it helps



  $.ajax({
    type: 'get',
    url: url,
    data: 'data',
    dataType: "JSON",

    }).done(function(data) {
    var alb = data.tracks;
    //callback success(alb)
    //alb.forEach(function(element){
    //console.log(element.name + "-" + element.popularity);
    success(alb);
    })
  //}).fail(function(){
    //console.log("Poop!");
  //})
}

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

  var tracklist = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracklist);
  var popularity = extractPopularity(tracklist);

  chartData(names, popularity); 

}

// function testy() {
//   var names = ["test1", "test2", "test3"];
//   var popularity = [34, 44, 22];

//   chartData(names, popularity); 

// }




