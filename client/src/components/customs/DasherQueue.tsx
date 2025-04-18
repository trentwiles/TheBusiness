import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PossibleOrderButton from "./snippets/PossibleOrderButton";
import ConfirmedOrder from "./snippets/ConfirmedOrder";
import { Card } from "@/components/ui/card"

// {
//   "orderTitle": "Available Order 1",
//   "orderItems": [{"Milk": 4.59, "Cheese": 15.12}],
//   "client": "Alexander",
//   "id": "3d3a62ec-25f8-4bb9-b9cb-2f79c37642f4",
// },

type orderItem = {
  [itemName: string]: number;
};

type orderMetadata = {
  orderTitle: string;
  orderItems: orderItem[];
  client: string;
  id: string;
};

type apiResponse = {
  availableOrders: orderMetadata[];
  acceptedOrders: orderMetadata[];
};

// order accept function
const orderNegociate = (
  userToken: string,
  id: string,
  hasAccepted: boolean
): void => {
  fetch(`${import.meta.env.VITE_API_ENDPOINT}/negociateOrder`, {
    method: "POST",
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: id,
      status: hasAccepted,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        toast(
          hasAccepted
            ? "Order accepted! We're now adding it to your current orders."
            : "Order rejected. You shouldn't see it again."
        );
      } else {
        toast("Unable to negociate order. HTTP Status " + res.status);
      }
    })
    .catch((error) => {
      toast("Unable to connect to API: " + error);
    });
};

export default function DasherQueue() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);

  const [currentOrders, setCurrentOrders] = useState<orderMetadata[]>();
  const [availableOrders, setAvailableOrders] = useState<orderMetadata[]>();

  const refreshOrders = (userInfo) => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/takenOrdersAndPossibleOrders`, {
      headers: {
        Authorization: userInfo.token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Failed to fetch orders. Status: ${res.status}`);
        }
      })
      .then((apiData: apiResponse) => {
        // shallow copy to force refresh, even if data is the same
        setAvailableOrders(JSON.parse(JSON.stringify(apiData.availableOrders)));
        setCurrentOrders(JSON.parse(JSON.stringify(apiData.acceptedOrders)));
      })
      .catch((error) => {
        console.error(error);
        toast("Unable to fetch orders from API");
      })
  };

  // first, ensure that the user has the dasher role
  // otherwise send them to the "missing role"/"locked" page
  useEffect(() => {
    if (loading) return;

    if (user == undefined) {
      navigate("/login", { replace: true });
      toast("You are not logged in, and therefore cannot see this page.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/me`, {
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((apiData) => {
        console.log(apiData.privledge_level != "Dasher");

        if (apiData.privledge_level != "Dasher") {
          navigate("/403", { replace: true });
          return;
        }
      })
      .catch(() => {
        // non-200 response
        // we assume the token has expired, or was forged, so it is destroyed
        toast("You'll need to log in on a Dasher account to view that page.");
        logout();
        navigate("/login", { replace: true });
        return;
      });

    // todo: http request to get dasher jobs

    setIsPending(false);

    toast("You are logged in, and can therefore view this page!");

    // if we've made it this far, we know the user has a privledge level of "dasher"
    // see layout: https://www.notion.so/trentwiles/QuickWagon-Dasher-Queue-1cbb34a7509c80be8e8fd0692796513a

    // now we can make a period request to fetch orders, both potencial orders and taken orders

    // refresh new orders every five seconds
    refreshOrders(user);
    const interval = setInterval(() => refreshOrders(user), 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [user, loading]);

  return (
    <>
      <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Available Orders
      </h1>
      {isPending ? (
        <Card className="w-full mb-2 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Skeleton className="h-5 w-40 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        </Card>
      ) : (
        <>
          {availableOrders !== undefined &&
            availableOrders.map((order) => (
              <PossibleOrderButton
                key={order.id}
                customer={order.client}
                orderID={order.id}
                orderTitle={`$${order.orderItems
                  .flatMap((itemObj) => Object.values(itemObj))
                  .reduce((sum, val) => sum + val, 0)
                  .toFixed(2)} order with ${
                  Object.keys(order.orderItems[0] ?? {}).length
                } ${
                  Object.keys(order.orderItems[0] ?? {}).length == 1
                    ? "item"
                    : "items"
                }`}
                negociateFunction={orderNegociate}
              />
            ))}
        </>
      )}
      <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Accepted Orders
      </h1>
      {isPending ? (
        <div className="w-full max-w-md p-4">
          <Skeleton className="w-full h-4 rounded" />
        </div>
      ) : (
        <>
          {currentOrders !== undefined &&
            currentOrders.map((order) => (
              <ConfirmedOrder
                key={order.id}
                customer={order.client}
                orderID={order.id}
                orderTitle={`$${order.orderItems
                  .flatMap((itemObj) => Object.values(itemObj))
                  .reduce((sum, val) => sum + val, 0)
                  .toFixed(2)} order with ${
                  Object.keys(order.orderItems[0] ?? {}).length
                } ${
                  Object.keys(order.orderItems[0] ?? {}).length == 1
                    ? "item"
                    : "items"
                }`}
              />
            ))}
        </>
      )}
    </>
  );
}
