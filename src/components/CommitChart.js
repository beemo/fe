import VueCharts from 'vue-chartjs'

import {
  Doughnut
} from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Beef', 'Pork', 'Chicken', 'Turkey', 'Lamb', 'Beef Jerky', 'Fish'],
      datasets: [{
        label: 'Most Popular Meats',
        data: [33, 23, 17, 12, 6, 5, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(23, 102, 255, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255,99,132,1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
      // datasets: [
      //   {
      //     label: 'Most Popular Meats',
      //     backgroundColor: '#f87979',
      //     data: [33, 23, 17, 12, 6, 5, 4]
      //   }
      // ]
    })
  }
}
