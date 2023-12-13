"use client";

import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Subtitle,
  Title,
} from "@tremor/react";
const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
];
const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const generateData = () => {
  let dataset = [];
  const dates = [
    "Jun 30",
    "Jul 01",
    "Jul 02",
    "Jul 03",
    "Jul 04",
    "Jul 05",
    "Jul 06",
    "Jul 07",
    "Jul 08",
    "Jul 09",
    "Jul 10",
    "Jul 11",
    "Jul 12",
    "Jul 13",
    "Jul 14",
    "Jul 15",
    "Jul 16",
    "Jul 17",
  ];

  for (let date of dates) {
    dataset.push({
      date,
      "checkout-1": Math.round(150 + Math.random() * 20 - 10),
      "checkout-2": Math.round(200 + Math.random() * 20 - 10),
      "checkout-3": Math.round(250 + Math.random() * 20 - 10),
    });
  }

  return dataset;
};

const mockDataset = generateData();
console.log(mockDataset);

export default function Chart() {
  return (
    <div className="grid w-full gap-4">
      <Card className="mt-8 bg-opacity-80 backdrop-blur-md mx-4 row-auto">
        <Title className="mb-2">My admin dashboard</Title>
        <AreaChart
          className="mt-4 h-auto w-full"
          defaultValue={0}
          data={mockDataset}
          categories={["checkout-1", "checkout-2", "checkout-3"]}
          index="date"
          colors={["indigo", "fuchsia", "emerald", "neutral"]}
          allowDecimals={false}
          yAxisWidth={60}
          noDataText="No data. Run your first test to get started!"
        />
      </Card>

      <Card className=" bg-opacity-80 backdrop-blur-md mx-4 row-auto h-auto">
        <Title>Number of species threatened with extinction (2021)</Title>
        <Subtitle>
          The IUCN Red List has assessed only a small share of the total known
          species in the world.
        </Subtitle>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={["Number of threatened species"]}
          colors={["purple"]}
          yAxisWidth={48}
          valueFormatter={valueFormatter}
        />
      </Card>
    </div>
  );
}
