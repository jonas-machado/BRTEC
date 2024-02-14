"use client";

import { useMemo, useState } from "react";
import { AreaChart, Card, Title } from "@tremor/react";

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

export default function Dashboard({ users }: any) {
  const [value, setValue] = useState(true);

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 0; i < months.length; i++) {
      const monthData: any = {};
      for (let user of users) {
        monthData[user.name] = user.configured.filter(
          (onu: any) =>
            onu.updatedAt.getMonth() === i || onu.createdAt.getMonth() === i
        ).length;
      }
      data.push({ date: months[i], ...monthData });
    }
    return data;
  }, [users]);
  const usersName = users.map((user: any) => user.name);
  return (
    <div className="flex w-full gap-4 m-4 flex-col">
      <Card className="bg-opacity-80 backdrop-blur-md row-auto">
        <Title>ONU configurada por mês</Title>
        <div className="p-2 sm:p-6">
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
    </div>
  );
}
