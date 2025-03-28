import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useEffect, useState } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  orders: {
    label: "orders",
    color: "#2563eb",
  },
  profit: {
    label: "profit",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

type props = {
  month: string;
};

type chartDataResponse = {
  month: string;
  sales: [
    {
      day: number;
      orders: number;
      profit: number;
    }
  ];
};

function getMonthNumber(monthName: string): number {
  const date = new Date(`${monthName} 1, 2000`);
  const month = date.getMonth(); // 0-based
  return isNaN(month) ? -1 : month + 1;
}

function chartDataResponseToChartData(input: chartDataResponse) {
  // convert chartDataResponse to below format:
  // {month: "June", desktop: 100, mobile: 50}
  const newChartData: { day: string; orders: number; profit: number }[] = [];
  input.sales.forEach((e) => {
    newChartData.push({
      day: `${getMonthNumber(input.month)}/${e.day}`,
      orders: e.orders,
      profit: e.profit * 0.5,
    });
  });
  return newChartData;
}

export default function SalesChart({ month }: props) {
  const [data, setData] = useState<chartDataResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // API Response should look like:
  //
  // [
  // {month: "January", "value": 40},
  // {month: "February", "value": 20},
  // ...
  // ]
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/sales/${month}`)
      .then((res) => {
        return res.json();
      })
      .then((apiData: chartDataResponse) => {
        setData(apiData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading && <Skeleton className="min-h-[200px] w-full" />}
      {data && (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartDataResponseToChartData(data)}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split("/")[1]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="orders" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="profit" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
}
