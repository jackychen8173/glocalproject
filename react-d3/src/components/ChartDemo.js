import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3';
import 'chart.js/auto';

export default function ChartDemo() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + '/voter_turnout.csv')
      .then(data => {
        console.log('Data:', data);

        // Use "election" for x-axis labels
        const years = data.map(d => d.election);

        // Figure out which columns are age groups   
        const ageGroups = Object.keys(data[0]).filter(col =>
          col !== 'election' && col !== 'Unnamed: 0' && col !== 'year'
        );
        console.log('Age Groups:', ageGroups);

        // Create datasets for Chart.js
        const datasets = ageGroups.map(group => ({
          label: group,
          data: data.map(d => parseFloat(d[group])),
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          fill: false,
          tension: 0.2
        }));
        console.log('Datasets:', datasets);

        setChartData({
          labels: years,
          datasets
        });
      });
  }, []);

  if (!chartData) return <div>Loading chart...</div>;

  return <Line data={chartData} />;
}
