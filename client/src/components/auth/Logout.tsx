import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  logout();

  navigate("/", { replace: true });

  return <p>Please wait...</p>;
}
