import Sidebar from "./components/customs/Sidebar";
import OrderGrid from './components/customs/OrderGrid'
import Login from "./components/customs/Login";
import Logout from "./components/auth/Logout";
import Tracking from "./components/customs/Tracking";
import FourOhFour from "./components/customs/FourOhFour";

import { SlidingChart } from "./components/customs/SlidingChart";
import { Toaster } from "@/components/ui/sonner";

/* react router related */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/customs/Home";

import { AuthProvider } from "./components/auth/AuthProvider";
import DasherQueue from "./components/customs/DasherQueue";

const App = () => {
  // const orderItemOne: OrderItem = { Lemonade: 2.39 };
  // const orderItemTwo: OrderItem = { "Coke Zero": 12.45 };

  // const exampleOrder: SingleOrder = {
  //   client: "James McDavid",
  //   id: "981290382838923932",
  //   orderTitle: "Some Random Order",
  //   orderItems: [orderItemTwo, orderItemOne],
  // };
  const [subclass, setSubclass] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  /* PAGE DEFINITIONS */

  function LoginPage({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("Login");
      setSubclass();
    }, []);

    return <Login enableCreateAccount={false} enableOauth={false} />;
  }

  function OrdersPage({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("Orders");
      setSubclass("Administrator");
    }, []);

    return <OrderGrid />;
  }

  function MySales({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("Sales Charts");
      setSubclass("Dasher");
    }, []);

    return <SlidingChart />;
  }

  function TrackingPage({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("Order Tracking");
      setSubclass("Customer");
    }, []);

    return <Tracking />;
  }

  function HomePage({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("");
      setSubclass("");
    }, []);

    return <Home />;
  }

  function NotFound({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("");
      setSubclass("");
    }, []);
    return <FourOhFour />;
  }

  function DasherOrderQueue({ setPageTitle, setSubclass }) {
    useEffect(() => {
      setPageTitle("Order Queue");
      setSubclass("Dasher");
    }, []);
    return <DasherQueue />;
  }

  /* END PAGE DEFINITONS */

  return (
    // <Sidebar children={<OrderGrid apiPath=`${import.meta.env.BASE_URL}/orders` />} />
    // <Sidebar children={<Login enableCreateAccount={false} enableOauth={false} />} />
    // <Sidebar
    //   children={
    //     <Tracking
    //       currentStatus={Status.Preparing}
    //       orderID={Math.floor(Math.random() * Math.pow(10, 16))}
    //       orders={exampleOrder.orderItems}
    //     />
    //   }
    // />

    //  <Sidebar dataMode="Administrator" pageSubclass="Orders" pageTitle="More Information" children={<SlidingChart />}/>
    <AuthProvider>
      <Router>
        <Sidebar
          dataMode="Administrator"
          pageSubclass={subclass}
          pageTitle={pageTitle}
        >
          {/* BEGIN CUSTOM ROUTES*/}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <OrdersPage
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route
              path="/sales-chart"
              element={
                <MySales
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route
              path="/track/:id"
              element={
                <TrackingPage
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route
              path="/dasher/queue"
              element={
                <DasherOrderQueue
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="*"
              element={
                <NotFound
                  setSubclass={setSubclass}
                  setPageTitle={setPageTitle}
                />
              }
            />
          </Routes>
          {/* END CUSTOM ROUTES*/}
          <Toaster />
        </Sidebar>
      </Router>
    </AuthProvider>
  );
};

export default App;
