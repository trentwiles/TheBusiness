import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type props = {
    orderID: number;
    orderTitle: string;
    customer: string;
}

export default function PossibleOrderButton(props: props) {
  return (
    <>
      <Card className="w-full mb-2 p-4" key={props.orderID}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-lg font-semibold mb-1">
              {props.orderTitle}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {props.customer}
            </CardDescription>
          </div>

          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => console.log(`accepted orderID ${props.orderID}`)}>
              <Check /> Accept
            </Button>
            <Button variant="destructive" onClick={() => console.log(`accepted orderID ${props.orderID}`)}>
              <X /> Reject
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
