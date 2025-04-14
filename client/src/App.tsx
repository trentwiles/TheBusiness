import Sidebar from "./components/customs/Sidebar";
import OrderGrid from "./components/customs/OrderGrid";
import Login from "./components/customs/Login";
import Logout from "./components/auth/Logout";
import Tracking from "./components/customs/Tracking";
import FourOhFour from "./components/customs/FourOhFour";

import { Toaster } from "@/components/ui/sonner";

/* react router related */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/customs/Home";

import { AuthProvider } from "./components/auth/AuthProvider";
import DasherQueue from "./components/customs/DasherQueue";

import RouteWrapper from "@/components/routing/RouterWrapper";
import SalesChart from "./components/customs/MonthSalesChart";
import SearchResults from "./components/customs/snippets/SearchResults";

const App = () => {
  const [subclass, setSubclass] = useState("");
  const [subclassTo, setSubclassTo] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    document.title = `${pageTitle} | The Business`;
  }, [pageTitle]);

  return (
    <AuthProvider>
      <Router>
        <Sidebar
          dataMode="Administrator"
          pageSubclass={subclass}
          pageSubclassTo={subclassTo}
          pageTitle={pageTitle}
        >
          {/* BEGIN CUSTOM ROUTES*/}
          <Routes>
            <Route
              path="/"
              element={
                <RouteWrapper
                  element={Home}
                  title="Home"
                  subclass=""
                  subclassLink="/"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <RouteWrapper
                  element={OrderGrid}
                  title="My Orders"
                  subclass="Customer"
                  subclassLink="/"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/dasher/sales"
              element={
                <RouteWrapper
                  element={() => <SalesChart month="1" />}
                  title="Monthly Sales"
                  subclass="Dasher"
                  subclassLink="/dasher"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RouteWrapper
                  element={() => (
                    <Login enableCreateAccount={false} enableOauth={false} />
                  )}
                  title="Log In"
                  subclass=""
                  subclassLink="/"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/track/:id"
              element={
                <RouteWrapper
                  element={Tracking}
                  title="Order Tracker"
                  subclass="Customer"
                  subclassLink="/orders"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/dasher/queue"
              element={
                <RouteWrapper
                  element={DasherQueue}
                  title="Dasher Order Queue"
                  subclass="Dasher"
                  subclassLink="/dasher"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/logout"
              element={
                <RouteWrapper
                  element={Logout}
                  title="Log Out"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="/search/:q"
              element={
                <RouteWrapper
                  element={SearchResults}
                  title="Search Results"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
                />
              }
            />
            <Route
              path="*"
              element={
                <RouteWrapper
                  element={FourOhFour}
                  title="404: Not Found"
                  setPageTitle={setPageTitle}
                  setSubclass={setSubclass}
                  setSubclassLink={setSubclassTo}
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
