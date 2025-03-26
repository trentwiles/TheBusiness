import {useState} from "react";

import { Progress } from "@/components/ui/progress";

import { OrderItem } from "@/components/customs/OrderGrid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ChevronsUpDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export enum Status {
  Preparing,
  Collecting,
  Awaiting,
  Completed,
}

const statusToProgressBarSize: { [key in Status]: number } = {
  [Status.Preparing]: 25,
  [Status.Collecting]: 50,
  [Status.Awaiting]: 75,
  [Status.Completed]: 100,
};

type props = {
  customTitle?: string | "Order Status";

  // order status + description
  customPreparingTitle?: string;
  customPreparingDesc?: string;
  customCollectingTitle?: string;
  customCollectingDesc?: string;
  customAwaitingExchangeTitle?: string;
  customAwaitingExchangeDesc?: string;
  customCompletedTitle?: string;
  customCompletedDesc?: string;

  // REQUIRED
  orderID: number;
  currentStatus: Status;
  orders: OrderItem[];
};

export default function Tracking(props: props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {props.customTitle || "Preparing Order"}
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Order ID: {props.orderID}
      </p>
      <Progress value={statusToProgressBarSize[props.currentStatus]} />
      {/* four steps: assign to worker, gathering, delivery, completed */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`m-4 ${
            props.currentStatus >= Status.Preparing
              ? ""
              : "opacity-50 pointer-events-none"
          }`}
        >
          <CardHeader>
            <CardTitle>{props.customPreparingTitle || "Preparing"}</CardTitle>
            <CardDescription>
              {props.customPreparingDesc ||
                "We are currently matching your order to a dasher. This should take no longer than 10 minutes."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
        <Card
          className={`m-4 ${
            props.currentStatus >= Status.Collecting
              ? ""
              : "opacity-50 pointer-events-none"
          }`}
        >
          <CardHeader>
            <CardTitle>{props.customCollectingTitle || "Collecting"}</CardTitle>
            <CardDescription>
              {props.customCollectingDesc ||
                "Your order is currently being handled by a dasher."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
        <Card
          className={`m-4 ${
            props.currentStatus >= Status.Awaiting
              ? ""
              : "opacity-50 pointer-events-none"
          }`}
        >
          <CardHeader>
            <CardTitle>
              {props.customAwaitingExchangeTitle || "Awaiting Pickup"}
            </CardTitle>
            <CardDescription>
              {props.customAwaitingExchangeDesc ||
                "The item(s) you ordered have been collected by your driver."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
        <Card
          className={`m-4 ${
            props.currentStatus >= Status.Completed
              ? ""
              : "opacity-50 pointer-events-none"
          }`}
        >
          <CardHeader>
            <CardTitle>{props.customCollectingTitle || "Completed"}</CardTitle>
            <CardDescription>
              {props.customCollectingDesc ||
                "Your order has been picked up and completed. This page is kept online to serve as a reciept."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
      </div>
      {/* your order section */}
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl px-2">
        Order Details
      </h1>
      <ul>
        
      </ul>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            {props.orders.length} items
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
        {props.orders.map((order, index) =>
          Object.entries(order).map(([itemName, itemPrice]) => (
            <div key={index} className="rounded-md border px-4 py-2 text-sm shadow-sm">
              {itemName} (${itemPrice.toFixed(2)})
            </div>
          ))
        )}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
