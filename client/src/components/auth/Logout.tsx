import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (user != undefined) {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
    });
  }

  logout();

  navigate("/", { replace: true });

  return <p>Please wait...</p>;
}
