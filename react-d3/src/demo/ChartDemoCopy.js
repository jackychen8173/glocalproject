import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3';
import 'chart.js/auto';
import Filter from './Filter';
import './ChartDemoCopy.css';

const ChartDemoCopy = () => {
    const[rawData, setRawData] = useState([]);
    const[ageGroups, setAgeGroups] = useState([]);
    const[selectedAgeGroup, setSelectedAgeGroup] = useState('');
    const[chartData, setChartData] = useState(null);

    useEffect(() => {
        d3.csv('/voter_turnout.csv')
            .then(data => {
                setRawData(data);

                const cols = Object.keys(data[0]);
                const groups = cols.filter(col => col !== 'election' && col !== 'Unnamed: 0' && col !== 'year' && col !== '')
                console.log(groups);
                setAgeGroups(groups);
            });
    }, []);

    useEffect(() => {
        if (rawData.length === 0) return;

        const years = rawData.map(d => d.election);

        const datasets = selectedAgeGroup ? [{
            label: selectedAgeGroup,
            data: rawData.map(d => parseFloat(d[selectedAgeGroup])),
            borderColor: 'steelblue',
            fill: false,
            tension: 0.2
        }] : ageGroups.map(group => ({
            label: group,
            data: rawData.map(d => parseFloat(d[group])),
            borderColor: '#000000',
            fill: false,
            tension: 0.2
        }));

        setChartData({
            labels: years,
            datasets
        })
    }, [rawData, ageGroups, selectedAgeGroup]);
    if (!chartData) return <div>Loading chart...</div>;
    return (
        <div>
            <Filter
            ageGroups={ageGroups}
            selectedAgeGroup={selectedAgeGroup}
            setSelectedAgeGroup={setSelectedAgeGroup}
            />
            <div className='chart-container'>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default ChartDemoCopy;