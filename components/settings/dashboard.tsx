"use client";

import { Switch } from "@headlessui/react";
import { User } from "@prisma/client";
import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Subtitle,
  Title,
} from "@tremor/react";
import { useState } from "react";
const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];
export default function Dashboard({ users }: any) {
  const [value, setValue] = useState(true);

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
    let data = [];
    for (let i = 0; i < months.length; i++) {
      const chartData: any = {};
      for (let user of users) {
        const month = user.configured.filter((onu: any) => {
          return onu.updatedAt.getMonth() == i || onu.createdAt.getMonth() == i;
        });
        console.log(month);
        chartData[user.name] = month.length;
      }
      data.push({ date: months[i], ...chartData });
    }
    return data;
  };
  const chartData = generateData();
  const usersName = users.map((user: any) => user.name);
  console.log(chartData);
  return (
    <div className="flex w-full gap-4 m-4 flex-col">
      <Card className="bg-opacity-80 backdrop-blur-md row-auto">
        <Title>ONU configurada por mês</Title>
        <div className="p-6">
          <AreaChart
            className="h-72 mt-4"
            data={chartData}
            index="date"
            categories={usersName}
            colors={[
              "cyan",
              "amber",
              "blue",
              "emerald",
              "fuchsia",
              "gray",
              "green",
              "indigo",
              "orange",
              "pink",
              "purple",
              "red",
              "rose",
              "sky",
              "teal",
              "violet",
              "yellow",
            ]}
            yAxisWidth={30}
            enableLegendSlider={value}
          />
        </div>
      </Card>
      <div className="flex gap-4">
        <Card className="bg-opacity-80 backdrop-blur-md ">
          <DonutChart
            className="m-6"
            data={cities}
            category="sales"
            index="name"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
        <Card className="bg-opacity-80 backdrop-blur-md ">
          <DonutChart
            className="m-6"
            data={cities}
            category="sales"
            index="name"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
        <Card className="bg-opacity-80 backdrop-blur-md ">
          <DonutChart
            className="m-6"
            data={cities}
            category="sales"
            index="name"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
        <Card className="bg-opacity-80 backdrop-blur-md ">
          <DonutChart
            className="m-6"
            data={cities}
            category="sales"
            index="name"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
      </div>
    </div>
  );
}
