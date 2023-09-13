import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Card, CardBody, Typography } from "@material-tailwind/react";

function DefaultLineChart({ color, chart, title, description, height }) {
  const chartOptions = {
    ...chart.options,
    colors: chart.datasets.map(dataset => colors[dataset.color] || colors.dark.main),
  };

  return (
    <Card>
      <CardBody className="p-6">
        {title && (
          <Typography variant="h6" color={color}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {description}
          </Typography>
        )}
      </CardBody>
      <Chart
        options={chartOptions}
        series={chart.datasets.map(dataset => dataset.data)}
        type="line"
        height={height}
        width="100%"
      />
    </Card>
  );
}

DefaultLineChart.defaultProps = {
  color: "blue",
  title: "",
  description: "",
  height: 300,
};

DefaultLineChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.shape({
    options: PropTypes.object.isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired,
  }).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  height: PropTypes.number,
};

export default DefaultLineChart;
