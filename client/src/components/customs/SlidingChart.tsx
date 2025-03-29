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
        <Button variant="outline" size="icon" onClick={() => (month >= 1 && month <= 12) ? setMonth(month - 1) : console.log("month out of range")}>
          <ChevronLeft />
        </Button>
        <Button>Adjust Month</Button>
        <Button variant="outline" size="icon" onClick={() => (month >= 1 && month <= 12) ? setMonth(month + 1) : console.log("month out of range")}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};
