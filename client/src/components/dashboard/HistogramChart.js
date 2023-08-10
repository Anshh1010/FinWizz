import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

const VictoryHistogramChart = ({ data }) => {
  const { labels, values } = data;

  // Create an array of data points with adjusted values
  const dataPoints = labels.map((label, index) => ({
    label: label,
    value: values[index] - 1 // Subtract 1 from each value
  }));

  // Set a color for all bars
  const barColor = "#FF5733";

  // Axis style with highlighted stroke color
  const axisStyle = {
    axis: { stroke: "#333" }, // Set the stroke color to highlight the axis
    tickLabels: { fontSize: 12, padding: 7 } // Adjust tick label font size and padding
  };

  return (
    <VictoryChart>
      <VictoryBar
        data={dataPoints}
        x="label"
        y="value"
        style={{ data: { fill: barColor } }} // Apply the same color to all bars
        labels={({ datum }) => (datum.value + 1).toFixed(2)} // Display value + 1 on the bars
        labelComponent={<VictoryLabel dy={10} textAnchor="middle" />} // Position labels below bars
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(tick) => (tick + 1).toFixed(2)}
        style={axisStyle} // Apply the axis style
      />
    </VictoryChart>
  );
};

export default VictoryHistogramChart;
