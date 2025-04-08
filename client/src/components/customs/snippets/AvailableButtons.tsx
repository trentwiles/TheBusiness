// outputs a certain set of buttons, based on the persmisison level passed in

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type props = {
  perm_level: string;
};

export default function AvailableButtons({ perm_level }: props) {
  switch (perm_level) {
    case "Dasher":
      return (
        <>
          <Link to="/dasher/queue">
            <Button>View Current Jobs</Button>
          </Link>
          <Link to="/dasher/sales">
            <Button>View Sales/Income</Button>
          </Link>
        </>
      );
    case "Customer":
      return (
        <>
          <Link to="/orders">
            <Button>View Orders</Button>
          </Link>
        </>
      );
    case "Administrator":
      return <></>;
    default:
      return (
        <>
          <code>Internal Error, Invalid Permissions</code>
        </>
      );
  }
}
