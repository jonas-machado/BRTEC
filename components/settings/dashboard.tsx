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
import dynamic from "next/dynamic";
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

const ProvisionPerMonth = dynamic(() => import("../card/ProvisionPerMonth"), {
  loading: () => <p>Loading...</p>,
});

export default function Dashboard({ users }: any) {
  // const generateData = () => {
  //   const months = [
  //     "Jan",
  //     "Fev",
  //     "Mar",
  //     "Abr",
  //     "Mai",
  //     "Jun",
  //     "Jul",
  //     "Ago",
  //     "Set",
  //     "Out",
  //     "Nov",
  //     "Dez",
  //   ];
  //   let data = [];
  //   for (let i = 0; i < months.length; i++) {
  //     const chartData: any = {};
  //     for (let user of users) {
  //       const month = user.configured.filter((onu: any) => {
  //         return onu.updatedAt.getMonth() == i || onu.createdAt.getMonth() == i;
  //       });
  //       console.log(month);
  //       chartData[user.name] = month.length;
  //     }
  //     data.push({ date: months[i], ...chartData });
  //   }
  //   return data;
  // };
  // const chartData = generateData();
  // const usersName = users.map((user: any) => user.name);
  // console.log(chartData);
  return <div className="flex w-full gap-4 m-4 flex-col">COMMING SOON</div>;
}
