import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "./../auth/AuthProvider";
import WelcomeHero from "@/components/customs/snippets/WelcomeHero"

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      {user == undefined ? (
        <WelcomeHero />
      ) : (
        <Link to="/orders">
          <Button>My Orders</Button>
        </Link>
      )}
    </>
  );
}
