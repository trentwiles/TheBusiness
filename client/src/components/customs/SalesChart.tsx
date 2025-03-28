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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
  { month: "September", desktop: 214, mobile: 140 },
  { month: "November", desktop: 214, mobile: 140 },
  { month: "December", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

type props = {
  apiUrl: string;
};

type chartDataResponse = {
  month: string;
  value: number;
};

function chartDataResponseToChartData(input: chartDataResponse[]) {
  // convert chartDataResponse to below format:
  // {month: "June", desktop: 100, mobile: 50}
  const newChartData: {month: string, desktop: number, mobile: number}[] = []
  input.forEach(e => {
    newChartData.push({month: e.month, desktop: e.value, mobile: e.value * 0.5})
  });
  return newChartData
}

export default function SalesChart({ apiUrl }: props) {
  const [data, setData] = useState<chartDataResponse[]>();
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
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((apiData: chartDataResponse[]) => {
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
          <BarChart accessibilityLayer data={chartDataResponseToChartData(data)}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
}
