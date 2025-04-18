import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

type props = {
  orderID: string;
  orderTitle: string;
  customer: string;
  // what's this? this is a function to either reject or accept the order
  negociateFunction: (
    userToken: string,
    id: string,
    hasAccepted: boolean
  ) => void;
};

export default function PossibleOrderButton(props: props) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
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
              <Button
                variant="secondary"
                onClick={() => {
                  props.negociateFunction(
                    user?.token || "",
                    props.orderID,
                    true
                  );
                  setIsVisible(false);
                }}
              >
                <Check /> Accept
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  props.negociateFunction(
                    user?.token || "",
                    props.orderID,
                    false
                  );
                  setIsVisible(false);
                }}
              >
                <X /> Reject
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
