import Sidebar from "./components/customs/Sidebar";
import Order from "./components/customs/Order";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useEffect, useState } from "react";

// item and it's price
type OrderItem = {
  [productName: string]: number;
};

// order metadata
type Order = {
  client: string;
  id: string;
  orderItems: OrderItem[];
  orderTitle: string;
};

// response from client
// {orders : [...]}
type OrdersResponse = {
  orders: Order[];
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
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

  const sampleCave: Map<string, number> = new Map();
  sampleCave.set("Carrots", 5.23);
  sampleCave.set("Apples", 10.12);
  return (
    <Sidebar
      children={
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Current Orders
          </h1>
          {isLoading && <i>Please wait...</i>}
          {isError && <span style={{ color: "red" }}></span>}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((order, count) => (
                <div
                  key={order.id}
                  className="h-32 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-md shadow-sm"
                >
                  <Order
                    orderItems={sampleCave}
                    orderTitle={order.orderTitle}
                    client={order.client}
                    id={order.id}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      }
    />
  );
}
