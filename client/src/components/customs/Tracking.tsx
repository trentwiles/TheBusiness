import React from "react";
import { Progress } from "@/components/ui/progress";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export enum Status {
  Preparing,
  Collecting,
  Awaiting,
  Completed,
}

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

  currentStatus: Status;
};

export default function Tracking(props: props) {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {props.customTitle || "Preparing Order"}
      </h1>
      <Progress value={25} />
      {/* four steps: assign to worker, gathering, delivery, completed */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
      <Card className={`m-4 ${(props.currentStatus >= Status.Preparing) ? '' : 'opacity-50 pointer-events-none'}`}>
          <CardHeader>
            <CardTitle>{props.customPreparingTitle || "Preparing"}</CardTitle>
            <CardDescription>
              {props.customPreparingDesc ||
                "We are currently matching your order to a dasher. This should take no longer than 10 minutes."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
        <Card className={`m-4 ${(props.currentStatus >= Status.Collecting) ? '' : 'opacity-50 pointer-events-none'}`}>
          <CardHeader>
            <CardTitle>{props.customCollectingTitle || "Collecting"}</CardTitle>
            <CardDescription>
              {props.customCollectingDesc ||
                "Your order is currently being handled by a dasher."}
            </CardDescription>
          </CardHeader>
          <CardContent>{/* messages/details here */}</CardContent>
        </Card>
        <Card className={`m-4 ${(props.currentStatus >= Status.Awaiting) ? '' : 'opacity-50 pointer-events-none'}`}>
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
        <Card className={`m-4 ${(props.currentStatus >= Status.Completed) ? '' : 'opacity-50 pointer-events-none'}`}>
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
    </>
  );
}
