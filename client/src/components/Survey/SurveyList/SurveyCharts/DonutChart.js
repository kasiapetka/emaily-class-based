import DonutChart from 'react-donut-chart';
import React from "react";

export default ({answers}) => {

    const d = answers.map(a => {
        return {
            value: a.count,
            label: a.value
        }
    });

    const data = [...d];

    return (
        <div className="chart">
            <DonutChart className=""
                        height={450}
                        colors={['#b71c1c', '#1a237e', '#ffd740', '#0277bd', '#2e7d32', '#f57c00', '#e64a19', '#546e7a', '#00838f', '#ad1457', '#6a1b9a', '#00695c', '#9e9d24', '#6d4c41']}
                        data={data}/>
        </div>
    )
}
