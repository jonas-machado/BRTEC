"use client";

import { User } from "@prisma/client";
import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Subtitle,
  Title,
} from "@tremor/react";

export default function Dashboard({ users }: any) {
  const generateData = () => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const chartData: any = {};

    users.forEach((user: any) => {
      user.configured.forEach((configuredItem: any) => {
        const month = configuredItem.updatedAt.getMonth(); // Assuming 'updatedAt' is a date field
        const monthKey = `${
          months[month]
        } ${configuredItem.updatedAt.getFullYear()}`; // Get month name + year
        if (!chartData[monthKey]) {
          chartData[monthKey] = {
            date: monthKey,
            [user.name]: 0,
          };
        }
        chartData[monthKey][user.name]++;
      });
      return chartData;
      // dataset.push({
      //   date,
      //   "checkout-1": Math.round(150 + Math.random() * 20 - 10),
      //   "checkout-2": Math.round(200 + Math.random() * 20 - 10),
      //   "checkout-3": Math.round(250 + Math.random() * 20 - 10),
      // });
    });
  };
  console.log(generateData());
  return (
    <div className="grid w-full gap-4">
      {/* <Card className="mt-8 bg-opacity-80 backdrop-blur-md mx-4 row-auto">
        <Title className="mb-2">My admin dashboard</Title>
        <AreaChart
          className="mt-4 h-auto w-full"
          defaultValue={0}
          data={""}
          categories={["checkout-1", "checkout-2", "checkout-3"]}
          index="date"
          colors={["indigo", "fuchsia", "emerald", "neutral"]}
          allowDecimals={false}
          yAxisWidth={60}
          noDataText="No data. Run your first test to get started!"
        />
      </Card> */}
    </div>
  );
}
