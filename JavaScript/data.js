let ctx = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('myChart2').getContext('2d');
let ctx3 = document.getElementById('myChart3').getContext('2d');
let ageCountLabel = [];
let ageLabel = [];
let ageDict = [];
let schoolLabel = [];
let schoolDict = [];
let schoolCountLabel = [];

var mymap = L.map('mapid').setView([0,0], 11);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);


    let url = 'https://us-central1-outsmartooh-demo.cloudfunctions.net/data';
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    
                    var male = 0;
                    var female = 0;

                    for (var i = 0; i < data.data.length; i++) {
                        if(data.data[i].gender == "M") {male++;}
                        else {female++};
                    }
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                          datasets: [{
                            data: [male, female],
                            backgroundColor: ['rgb(54, 162, 235, 0.7)', 'rgb(255, 99, 132, 0.7)'],
                          }],
                          hoverOffset: 4,
                          labels: ['Male', 'Female']
                        },
                        options: {
                          legend: {
                            position: 'bottom'
                          }, 
                        }
                      });


                      let schoolFlag = false;
                      for (var i = 0; i < data.data.length; i++) {
                          schoolFlag = false;
                          for (var j = 0; j < i; j++) {
                              if(schoolLabel[j] == data.data[i].edu) {schoolCountLabel[j] += 1; schoolFlag = true; break; }
                              
                          }
                          if(!schoolFlag) {schoolLabel[i] = data.data[i].edu; schoolCountLabel[i] = 1;}
                      }
                      for (var i = 0; i < schoolLabel.length; i++) {
                          if(schoolLabel[i] != undefined){
                              schoolDict[schoolLabel[i]] = schoolCountLabel[i];
                          }
                      }
                      schoolDict = Object.keys(schoolDict).sort().reduce((r, k) => (r[k] = schoolDict[k], r), {});
                      new Chart(ctx2, {
                          type: 'bar',
                          data: {
  
                              datasets: [{
                              data: Object.values(schoolDict),
                              backgroundColor:['rgb(255, 205, 86, 0.7)',"rgb(0, 153, 255, 0.7)"],
                              
                              }],
                              labels: Object.keys(schoolDict)
                          },
                          options: {
                            legend: {
                                display: false,
                                legendText : ['education Distribution', 'ajsndjasd']
                                    },
                              scales: {
                                  yAxes: [{
                                      ticks: {beginAtZero:true}
                                  }]
                              },
                          }
                          }); 

                    let ageFlag = false;
                    ageDict = Object.keys(ageDict).sort().reduce((r, k) => (r[k] = ageDict[k], r), {});
                    for (var i = 0; i < data.data.length; i++) {
                        ageFlag = false;
                        for (var j = 0; j < i; j++) {
                            if(ageLabel[j] == data.data[i].age) {ageCountLabel[j] += 1; ageFlag = true; break; }
                        }
                        if(!ageFlag) {ageLabel[i] = data.data[i].age; ageCountLabel[i] = 1;}
                    }
                    for (var i = 0; i < ageLabel.length; i++) {
                        ageDict[ageLabel[i]] = ageCountLabel[i];

                    }
                    new Chart(ctx3, {
                        type: 'bar',
                        data: {
                            datasets: [{
                            data: Object.values(ageDict),
                            backgroundColor:["rgb(101, 235, 93, 0.7)", "rgb(150, 126, 34, 0.7)", "rgb(248, 167, 75, 0.7)", 
                                             "rgb(202, 206, 70, 0.7)", "rgb(2, 207, 216, 0.7)", "rgb(171, 91, 222, 0.7)", "rgb(109, 239, 87, 0.7)", "rgb(64, 59, 99, 0.7)"],
                            
                            }],
                            labels: Object.keys(ageDict)
                        },
                        
                        options: {
                            legend: {
                                display: false,
                                legendText : ['age Distribution']
                                    },
                            scales: {
                                yAxes: [{
                                    ticks: {beginAtZero:true}
                                }]
                            },

                        }
                        });

                        var meanLatitude = 0;
                        var meanLongitude = 0;
    
                        for (var i = 0; i < data.data.length; i++) {
                            var latitude = data.data[i].geo[0];
                            var longitude = data.data[i].geo[1];
                            
                            meanLatitude += latitude;
                            meanLongitude += longitude;
    
                            L.marker([latitude,longitude]).addTo(mymap);
                         }
    
                         meanLatitude /= data.data.length;
                         meanLongitude /= data.data.length;
    
                         mymap.panTo([meanLatitude,meanLongitude]);
    
                        

                })
                .catch(function (err) {
                    console.log('error: ' + err);
                });







