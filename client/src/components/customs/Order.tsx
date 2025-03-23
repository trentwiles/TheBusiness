import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SingleOrder, OrderItem } from "./OrderGrid"
import { ReactNode } from "react"



function orderToString(contents: OrderItem[]): ReactNode {
  if (contents.length === 0) {
    return <></>;
  }

  const order = contents[0];

  return (
    <ul>
      {Object.entries(order).map(([itemName, itemPrice]) => (
        <li key={itemName}>
          {itemName} (${itemPrice.toFixed(2)})
        </li>
      ))}
    </ul>
  );
}

function sumTotal(contents: OrderItem[]) {
  let runningTotal: number = 0;
  
  Object.entries(contents[0]).map(([, itemPrice]) => (
    runningTotal += itemPrice
  ))

  return runningTotal.toFixed(2)
}

// todo: actual implementation with fetch
function markCompleted(id: string) {
  console.log("marked job " + id + " as completed!");
}

// todo: actual implementation with fetch
function markCancel(id: string) {
  console.log("marked job " + id + " as canceled!");
}

type props = {
  orderMetadata: SingleOrder
}

export default function Order(props: props) {
  return (
    <>
      <Card className="m-4">
        <CardHeader>
          <CardTitle>
            {props.orderMetadata.orderTitle} - {props.orderMetadata.client}
          </CardTitle>
          <CardDescription>
            <p>
              {orderToString(props.orderMetadata.orderItems)}
              <br />
              <strong>${sumTotal(props.orderMetadata.orderItems)}</strong>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>{/* messages/details here */}</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => markCancel(props.orderMetadata.id)}>
            Cancel
          </Button>
          <Button onClick={() => markCompleted(props.orderMetadata.id)}>Mark as Completed</Button>
        </CardFooter>
      </Card>
    </>
  );
}
