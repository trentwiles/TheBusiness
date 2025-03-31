import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

type props = {
  // the final submit order endpoint
  apiEndpoint: string;
  orderID: number;
  // string list of order items
  orderItems: string[];

  totalBeforeTip: number;
  totalAfterTip: number;

  // only true when the TOS have been accepted
  isEnabled: boolean;

  // finally, an observer telling the parent to wipe itself
  pageWipeListener: (wipeEverything: boolean) => void;
};

type success = true | false | "unknown";

export default function ConfirmOrderButton({
  apiEndpoint,
  orderItems,
  orderID,
  totalBeforeTip,
  totalAfterTip,
  isEnabled,
  pageWipeListener
}: props) {
  const [status, setStatus] = useState<success>("unknown");
  const [isPending, setIsPending] = useState<boolean>(false);
  const fresh = useRef(true);

  const submitOrder = () => {
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderItems: orderItems,
        orderID: orderID != undefined ? orderID : 0,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((apiData) => {
        setStatus(true);
        if (apiData.error) {
          setStatus(false);
        }
        setIsPending(false);
      })
      .catch(() => {
        setStatus(false);
        setIsPending(false);
      });
  };

  useEffect(() => {
    // don't run on first render
    if (fresh.current) {
      fresh.current = false;
      return;
    }

    toast(
      status == true
        ? `Order #${orderID} Placed`
        : `Unable to Place Order #${orderID}`
    );

    if (status == true) {
      pageWipeListener(true)
    }
  }, [status]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isEnabled ? false : true}>
        <Button variant="outline">{isEnabled ? `Confirm Order` : `Accept Terms of Service`}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order Summary</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to place an order for {orderItems.length} items, for a
            total of ${totalAfterTip} (${totalAfterTip - totalBeforeTip} tip + $
            {totalBeforeTip} base)
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending == true ? true : false}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={submitOrder}
            disabled={(isPending == false) ? false : true}
          >
            {isPending == false ? "Continue" : "Please Wait"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
