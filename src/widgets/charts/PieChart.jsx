import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart" className="mb-3 rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">Grafico Em Cartão </h2>
        <div className="flex items-center justify-center">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    );
  }
}

export default PieChart;
