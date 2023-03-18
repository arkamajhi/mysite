/*
const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  */

  /*

  var ctx = document.getElementById('myChart');
        var myLineChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Running','Swimming', 'Eating','Cycling','Skating','Singing','Balling'],
                datasets: [{
                    data: [150, 164, 210, 195, 169, 184, 250],
                    label: "A Team",
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    data: [168, 170, 178, 190, 203, 276,279],
                    label: "B Team",
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'School Tournament(Max points - 300)'
                }
            }
        });
        */

const charData = 'csv\dga_dh_2019.csv';
d3.csv(charData).then(function(datapoints){
    console.log(datapoints);
    const cost=[];
    for(i=0;i<datapoints.length;i++)
    {
        cost.push(datapoints.length[i].cost)
    }
    console.log(cost);
});