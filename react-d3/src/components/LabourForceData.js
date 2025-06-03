import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3';
import 'chart.js/auto';

const LabourForceData = () => {
    const[data, setData] = useState(null);

    useEffect(() => {
        d3.csv('/labour_force.csv')
            .then(data => {
                const years = data.map(d => d.year);
                const cols = Object.keys(data[0]);
                const groups = cols.filter(col => col !== 'year' && col !== 'Unnamed: 0' && col !== '');

                const datasets = groups.map(group => ({
                    label: group,
                    data: data.map(d => parseFloat(d[group])),
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    fill: false,
                    tension: 0.2
                }));

                setData({
                    labels: years,
                    datasets
                })
            });
    }, []);
    
    if (!data) return <div>Loading data...</div>;
    return(
        <div>
            <Line data={data} />
        </div>
    )
};

export default LabourForceData;