import React from "react";
import { StatisticsChart } from "@/widgets/charts";

import { Square3Stack3DIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import {statisticsChartsData02} from "@/data";
import {statisticsChartsData01} from "@/data";
import PieChart from "@/widgets/charts/PieChart";
import {
    Typography
  } from "@material-tailwind/react";
  import {
    ClockIcon
  } from "@heroicons/react/24/outline";
import RealtimeATMStatusComponent from "@/widgets/charts/RealtimeATMStatusComponent";

export function ATMCharts() {
  
  return (
    <>

    <div className="mb-6 my-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-8 xl:grid-cols-1">
      <RealtimeATMStatusComponent bgColor="bg-gray-400" />
    </div>

      <div className="mb-6 my-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-8 xl:grid-cols-1">
        {statisticsChartsData01.map((props) => (
            <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 my-4 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData02.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normaltext-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
        <PieChart />
      </div>
    </>
  );
}

export default ATMCharts;
