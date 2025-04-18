import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type props = {
  orderID: string;
  orderTitle: string;
  customer: string;
};

export default function ConfirmOrderButton(props: props) {
  const { user, loading } = useAuth();

  const [pending, setIsPending] = useState<boolean>(true);
  const [orderStatus, setOrderStatus] = useState<string>();
  const [orderPlacedTime, setOrderPlacedTime] = useState<string>();

  useEffect(() => {
    if (loading) return;
    if (user === undefined) {
      toast("Unable to access while not signed in");
      return;
    }

    setIsPending(true);
    // get order details on load
    fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/getOrderTrackingStatus?q=${
        props.orderID
      }`,
      { headers: { Authorization: user.token } }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrderStatus(data.order.status);
        setOrderPlacedTime(data.order.verbose.placed_time);
      })
      .catch((e) => {
        console.error(
          "get order tracking error, if you see this message report to administrator"
        );
        console.log(e);
        toast("API error, please see dev console.");
      });

    setIsPending(false);
  }, [props.orderID, user, loading]);
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
              {!pending ? ` - order placed at ${orderPlacedTime}` : ""}
            </CardDescription>
          </div>

          <div className="flex space-x-2">
            {/* depending on the status of the order, the options here change */}
            {/* Preparing => "Confirm Item Pickup" */}
            {/* Collecting => "Confirm Customer Exchange" */}
            {pending ? (
              <Skeleton className="h-10 w-32 rounded-md" />
            ) : orderStatus == "Collecting" ? (
              <Button variant="secondary">Confirm Item Pickup</Button>
            ) : (
              <Button variant="secondary">Confirm Customer Exchange</Button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
