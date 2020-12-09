import React from 'react'
import { Chart } from 'react-charts'

const BarChart =({answers})=> {
    const d = answers.map(a => [a.value, a.count]);

    const data = React.useMemo(
        () => [
            {
                data: [...d]
            }
        ],
        [d]
    )
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { position: 'left', type: 'linear', stacked: false },
        ],
        []
    );
    const series = React.useMemo(
        () => ({
            type: 'bar'
        }),
        []
    );

    const getSeriesStyle = React.useCallback((series) => {
        return {
            fill: "rgba(26,35,126,0.8)",
        };
    }, []);

  return (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '100%',
                height: '300px',
                maxWidth: '600px',
                margin: 'auto'
            }}
        >
            <Chart data={data} series={series} axes={axes} getSeriesStyle={getSeriesStyle} tooltip secondaryCursor/>
        </div>
    )
};
export default BarChart;
