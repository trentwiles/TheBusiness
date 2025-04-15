import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PossibleOrderButton from "./snippets/PossibleOrderButton";

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

export default function DasherQueue() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);

  const [currentOrders, setCurrentOrders] = useState<orderMetadata[]>();
  const [availableOrders, setAvailableOrders] = useState<orderMetadata[]>();

  const refreshOrders = (userInfo) => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/me`, {
      headers: {
        Authorization: userInfo.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((apiData: apiResponse) => {
        setAvailableOrders(apiData.availableOrders);
        setCurrentOrders(apiData.acceptedOrders);
      });
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
        <div className="w-full max-w-md p-4">
          <Skeleton className="w-full h-4 rounded" />
        </div>
      ) : (
        <>
          <PossibleOrderButton
            customer="Darius"
            orderID={9835454}
            orderTitle="$100 order with 28 items"
          />
          <PossibleOrderButton
            customer="Frank"
            orderID={98542984}
            orderTitle="$120 order with 23 items"
          />
          <PossibleOrderButton
            customer="Darius"
            orderID={2984895}
            orderTitle="$60 order with 6 items"
          />
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
        ``
      )}
    </>
  );
}
