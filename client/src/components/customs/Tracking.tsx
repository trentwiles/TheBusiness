import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

import { OrderItem } from "@/components/customs/OrderGrid";

import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ChevronsUpDown, LoaderCircle } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { toast } from "sonner";

enum Status {
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

const stringStatusToEnum = (stringStatus: string): Status => {
  switch (stringStatus) {
    case "Awaiting":
      return Status.Awaiting;
    case "Preparing":
      return Status.Preparing;
    case "Collecting":
      return Status.Collecting;
    case "Completed":
      return Status.Completed;
    default:
      throw new Error(`${stringStatus} cannot be converted to a state!`);
  }
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
  // orderID: number;
  // currentStatus: Status;
  // orders: OrderItem[];
};

export default function Tracking(props: props) {
  const [isOpen, setIsOpen] = useState(true);
  const [orderState, setOrderState] = useState<Status>(Status.Awaiting);
  const [timestamps, setTimestamps] = useState<Record<string, string>>();
  const [orderContents, setOrderContents] = useState<OrderItem[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/getOrderTrackingStatus?q=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrderState(stringStatusToEnum(data.order.status));
        setTimestamps(data.order.verbose);
      })
      .catch((e) => {
        console.error(
          "get order tracking error, if you see this message report to administrator"
        );
        console.log(e);
        toast("API error, please see dev console.");
      });

    // need to add another fetch to get order details, the fetch above only gets tracking

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/getOrder?q=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrderContents(data.orderItems);
      })
      .catch((e) => {
        console.error(
          "getorder error, if you see this message report to administrator"
        );
        console.log(e);
        toast("API error, please see dev console.");
      });

    console.log(orderContents);
    setPending(false);
  }, [pending]);

  setInterval(() => {
    setPending(true);
  }, 5000);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {orderState == 0
          ? "Preparing Order"
          : orderState == 1
          ? "Awaiting Pickup"
          : orderState == 2
          ? "Collecting Order Items"
          : "Order Completed 🎉"}
      </h1>
      <p className="text-sm text-muted-foreground mb-10">Order ID: {id}</p>
      <div className="px-4">
        <Progress value={statusToProgressBarSize[orderState]} />
      </div>
      {/* four steps: assign to worker, gathering, delivery, completed */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`m-4 ${
            orderState >= Status.Preparing
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
            orderState >= Status.Collecting
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
            orderState >= Status.Awaiting
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
            orderState >= Status.Completed
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
        {pending == true || orderContents.length == 0 ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div
              className="flex items-center justify-between space-x-4 px-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h4 className="text-sm font-semibold">
                {pending == false &&
                  orderContents.map(
                    (order) => Object.entries(order).length
                  )}{" "}
                {orderContents.map((order) => Object.entries(order).length)[0] >
                1
                  ? "items"
                  : "item"}
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              {orderContents?.map((order, index) =>
                Object.entries(order).map(([itemName, itemPrice]) => (
                  <div
                    key={index}
                    className="rounded-md border px-4 py-2 text-sm shadow-sm"
                  >
                    {itemName} (${itemPrice.toFixed(2)})
                  </div>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        )}
        {/* Time Details */}
        {pending == true || timestamps == undefined ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <table border={1}>
            <tbody>
              {timestamps.placed_time ? (
                <tr>
                  <td>
                    <strong>Order Placed At</strong>
                  </td>
                  <td>{new Date(timestamps.placed_time).toLocaleString()}</td>
                </tr>
              ) : (
                ""
              )}
              {timestamps.accepted_by ? (
                <tr>
                  <td>
                    <strong>Driver Name</strong>
                  </td>
                  <td>
                    <code>{timestamps.accepted_by}</code>
                  </td>
                </tr>
              ) : (
                ""
              )}
              {timestamps.assignment_time ? (
                <tr>
                  <td>
                    <strong>Driver Assigned At</strong>
                  </td>
                  <td>
                    {new Date(timestamps.assignment_time).toLocaleString()}
                  </td>
                </tr>
              ) : (
                ""
              )}
              {timestamps.fufillment_time ? (
                <tr>
                  <td>
                    <strong>Item Fufillment Time</strong>
                  </td>
                  <td>
                    {new Date(timestamps.fufillment_time).toLocaleString()}
                  </td>
                </tr>
              ) : (
                ""
              )}
              {timestamps.pickup_time ? (
                <tr>
                  <td>
                    <strong>Order Picked Up At</strong>
                  </td>
                  <td>{new Date(timestamps.pickup_time).toLocaleString()}</td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
