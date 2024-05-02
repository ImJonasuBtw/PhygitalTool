"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auto_1 = require("chart.js/auto");
var ctx = document.getElementById('myChart');
if (ctx) {
    new auto_1.default(ctx, {
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
}
