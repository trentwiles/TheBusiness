import Sidebar from "./components/customs/Sidebar";
// import OrderGrid from './components/customs/OrderGrid'
// import Login from './components/customs/Login'
import Tracking from "./components/customs/Tracking";
import { Status } from "./components/customs/Tracking";
import { SingleOrder, OrderItem } from "./components/customs/OrderGrid";

const App = () => {
  const orderItemOne: OrderItem = { Lemonade: 2.39 };
  const orderItemTwo: OrderItem = { "Coke Zero": 12.45 };

  const exampleOrder: SingleOrder = {
    client: "James McDavid",
    id: "981290382838923932",
    orderTitle: "Some Random Order",
    orderItems: [orderItemTwo, orderItemOne],
  };
  return (
    // <Sidebar children={<OrderGrid apiPath=`${import.meta.env.BASE_URL}/orders` />} />
    // <Sidebar children={<Login enableCreateAccount={false} enableOauth={false} />} />
    <Sidebar
      children={
        <Tracking
          currentStatus={Status.Preparing}
          orderID={Math.floor(Math.random() * Math.pow(10, 16))}
          orders={exampleOrder.orderItems}
        />
      }
    />
  );
};

export default App;
