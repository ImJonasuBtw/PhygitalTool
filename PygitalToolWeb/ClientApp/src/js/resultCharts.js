import Chart from 'chart.js/auto';
const ctx = document.getElementById('myChart');
const datasets = {
    datasets: [{
            data: [{ key: 'Sales', value: 20 }, { key: 'Revenue', value: 10 }],
            parsing: {
                xAxisKey: 'key',
                yAxisKey: 'value'
            }
        }],
};
if (ctx) {
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
            datasets: [{
                    label: 'times answered',
                    data: [12, 19, 3, 5, 2],
                    borderWidth: 1
                }]
        }
    });
}
