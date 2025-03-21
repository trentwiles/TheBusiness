import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { markAsUncloneable } from "worker_threads";

type props = {
  orderTitle: string;
  orderItems: Map<string, number>;
  client: string;
  id: string;
  // no need for total price/total items, this can be computed from hashmap
};
function propsToString(contents: Map<string, number>): string {
  const data = [...contents.entries()];
  if (data.length == 0) {
    return "";
  }
  return data
    .map(([key, value]) => "" + `${key} ($${value}), `)
    .join("")
    .slice(0, -2);
}

function sumTotal(contents: Map<string, number>) {
  return Array.from(contents.values()).reduce((digit, a) => digit + a, 0);
}

function markCompleted() {
  console.log("mark as completed boilerplate")
}

function markCancel(id: string) {
  console.log("marked job " + id + " as completed boilerplate")
}

export default function Order(props: props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {props.orderTitle} - {props.client}
        </CardTitle>
        <CardDescription>
          <p>
            {propsToString(props.orderItems)}
            <br />
            <strong>${sumTotal(props.orderItems)}</strong>
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>{/* messages/details here */}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => markCancel(props.id)}>Cancel</Button>
        <Button onClick={markCompleted}>Mark as Completed</Button>
      </CardFooter>
    </Card>
  );
}
