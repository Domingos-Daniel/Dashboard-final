import React, { useRef } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export function StatisticsChart({ color, chart, title, description, footer }) {
  const chartRef = useRef(null);

  const chartOptions = {
    ...chart.options,
    chart: {
      ...chart.options.chart,
      zoom: {
        enabled: true,
        type: "xy",
      },
      toolbar: {
        show: true, // Mostra a barra de ferramentas
        tools: {
          zoomin: true, // Habilita o botão de zoom in
          zoomout: true, // Habilita o botão de zoom out
          download: true, // Habilita o botão de download/exportação
          selection: true, // Habilita a seleção de área
          reset: true, // Habilita o botão de reset
        },
      },
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"], // Defina as cores do gráfico
  };

  return (
    <Card>
      <CardHeader variant="gradient" color={color}>
        <Chart
          options={chartOptions}
          series={chart.series}
          type={chart.type}
          height={chart.height}
          width="100%"
          ref={chartRef}
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
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
    series: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
