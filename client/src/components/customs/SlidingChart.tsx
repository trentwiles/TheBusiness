import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight } from "lucide-react";

import MonthSalesChart from "./MonthSalesChart";
import { useState } from "react";

export const SlidingChart = () => {
  const [month, setMonth] = useState(1);
  return (
    <>
      <MonthSalesChart month={month + ""} key={month} />
      <div className="flex justify-center items-center space-x-4 ">
        <Button variant="outline" size="icon" onClick={() => setMonth((month + 10) % 12 + 1)}>
          <ChevronLeft />
        </Button>
        <Button>Adjust Month</Button>
        <Button variant="outline" size="icon" onClick={() => setMonth((month % 12) + 1)}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};
