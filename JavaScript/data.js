let yas_adet_lbl = [];
let yas_lbl = [];
let yas_sozluk = [];
let okul_lbl = [];
let okul_sozluk = [];
let okul_adet_sozluk = [];

let ctx = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('myChart2').getContext('2d');
let ctx3 = document.getElementById('myChart3').getContext('2d');
let mymap = L.map('mapid').setView([0,0], 10.7);
let tile_link = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tile_layer = L.tileLayer(tile_link);
tile_layer.addTo(mymap);


    let url = 'https://us-central1-outsmartooh-demo.cloudfunctions.net/data';
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (output) {
                    
                    let erkek_sayi = 0;
                    let kadin_sayi = 0;

                    for (let i = 0; i < output.data.length; i++) {
                        if(output.data[i].gender == "M") {erkek_sayi++;}
                        else {kadin_sayi++};
                    }
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                          datasets: [{
                            data: [erkek_sayi, kadin_sayi],
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


                      let okul_gecici = false;
                      for (let i = 0; i < output.data.length; i++) {
                          okul_gecici = false;
                          for (let j = 0; j < i; j++) {
                              if(okul_lbl[j] == output.data[i].edu) {okul_adet_sozluk[j] += 1; okul_gecici = true; break; }
                              
                          }
                          if(!okul_gecici) {okul_lbl[i] = output.data[i].edu; okul_adet_sozluk[i] = 1;}
                      }
                      for (let i = 0; i < okul_lbl.length; i++) {
                          if(okul_lbl[i] != undefined){
                              okul_sozluk[okul_lbl[i]] = okul_adet_sozluk[i];
                          }
                      }
                      okul_sozluk = Object.keys(okul_sozluk).sort().reduce((r, k) => (r[k] = okul_sozluk[k], r), {});
                      new Chart(ctx2, {
                          type: 'bar',
                          data: {
  
                              datasets: [{
                              data: Object.values(okul_sozluk),
                              backgroundColor:['rgb(255, 205, 86, 0.7)',"rgb(0, 153, 255, 0.7)"],
                              
                              }],
                              labels: Object.keys(okul_sozluk)
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

                    let yas_gecici = false;
                    yas_sozluk = Object.keys(yas_sozluk).sort().reduce((r, k) => (r[k] = yas_sozluk[k], r), {});
                    for (let i = 0; i < output.data.length; i++) {
                        yas_gecici = false;
                        for (let j = 0; j < i; j++) {
                            if(yas_lbl[j] == output.data[i].age) {yas_adet_lbl[j] += 1; yas_gecici = true; break; }
                        }
                        if(!yas_gecici) {yas_lbl[i] = output.data[i].age; yas_adet_lbl[i] = 1;}
                    }
                    for (let i = 0; i < yas_lbl.length; i++) {
                        yas_sozluk[yas_lbl[i]] = yas_adet_lbl[i];

                    }
                    new Chart(ctx3, {
                        type: 'bar',
                        data: {
                            datasets: [{
                            data: Object.values(yas_sozluk),
                            backgroundColor:["rgb(101, 235, 93, 0.7)", "rgb(150, 126, 34, 0.7)", "rgb(248, 167, 75, 0.7)", 
                                             "rgb(202, 206, 70, 0.7)", "rgb(2, 207, 216, 0.7)", "rgb(171, 91, 222, 0.7)", "rgb(109, 239, 87, 0.7)", "rgb(64, 59, 99, 0.7)"],
                            
                            }],
                            labels: Object.keys(yas_sozluk)
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

                        let latitude_ort = 0, longitude_ort = 0;

                        for (let i = 0; i < output.data.length; i++) {
                            let latitude = output.data[i].geo[0];
                            let longitude = output.data[i].geo[1];
                            
                            latitude_ort += latitude;
                            longitude_ort += longitude;
    
                            L.marker([latitude,longitude]).addTo(mymap);
                         }
    
                         latitude_ort = latitude_ort / output.data.length;
                         longitude_ort = longitude_ort / output.data.length;
                         mymap.panTo([latitude_ort,longitude_ort]);
    
                        

                })
                .catch(function (err) {
                    console.log(err);
                });







