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

import { useAuth } from "./../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      profit: e.profit * import.meta.env.VITE_MOBILE_CHART_MULTIPLIER,
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
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return

    if (user == undefined) {
      toast("Please sign in to view monthly sales.")
      navigate("/login", { replace: true });
      return;
    }

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
    <div className="w-full px-4 md:px-8 lg:px-16">
      {isLoading && <Skeleton className="w-full h-full" />}
      {isError && <p>Whoops, there's been an issue with the backend</p>}
      {data && (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data.month}
        </h1>
      )}
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
      <div className="buffer pb-4"></div>
    </div>
  );
}
