
import Order from "./Order"


import { useEffect, useState } from "react";

// item and it's price
export type OrderItem = {
  [productName: string]: number;
};

// order metadata
export type SingleOrder = {
  client: string;
  id: string;
  orderItems: OrderItem[];
  orderTitle: string;
};

// response from client
// {orders : [...]}
type OrdersResponse = {
  orders: SingleOrder[];
};

type props = {
    apiPath: string;
}

export default function OrderGrid(props: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<SingleOrder[]>([]);

  useEffect(() => {
    fetch(props.apiPath)
      .then((res) => {
        return res.json();
      })
      .then((apiData: OrdersResponse) => {
        setData(apiData.orders);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Current Orders
          </h1>
          {isLoading && <i>Please wait...</i>}
          {isError && <span style={{ color: "red" }}></span>}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((order) => (
                <div
                  key={order.id}
                  className=""
                >
                  <Order orderMetadata={order} />
                </div>
              ))}
            </div>
          )}
        </>
  );
}