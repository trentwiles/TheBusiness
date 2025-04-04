import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "./../auth/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      {user == undefined ? (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      ) : (
        <Link to="/orders">
          <Button>My Orders</Button>
        </Link>
      )}
    </>
  );
}
