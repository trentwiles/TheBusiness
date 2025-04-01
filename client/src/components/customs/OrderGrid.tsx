
import Order from "./Order"
import { Link } from 'react-router-dom';


import { useEffect, useState } from "react";
import PlaceRequest from "./PlaceRequest";

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


export default function OrderGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<SingleOrder[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/orders`)
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
                <Link to={`/track/${order.id}`} >
                  <div
                    key={order.id}
                    className=""
                  >
                    <Order orderMetadata={order} />
                  </div>
                </Link>
              ))}
            </div>
          )}
          <PlaceRequest />
        </>
  );
}