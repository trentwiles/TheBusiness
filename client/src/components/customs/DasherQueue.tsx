import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/AuthProvider";
import { useEffect, useState } from "react";

export default function DasherQueue() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);

  // first, ensure that the user has the dasher role
  // otherwise send them to the "missing role"/"locked" page
  // https://trentwil.es/a/w6XEd5mTxb.png
  // bug ^^^
  useEffect(() => {
    console.log(user)
    if (user == undefined) {
      navigate("/login", { replace: true });
      return
    }

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/me`, {
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((apiData) => {
        console.log(apiData.privledge_level != "Dasher")
        if (apiData.privledge_level != "Dasher") {
          navigate("/403", { replace: true });
          return
        }
      })
      .catch(() => {
        // non-200 response
        // we assume the token has expired, or was forged, so it is destroyed
        logout();
        navigate("/login", { replace: true });
        return
      });

    // if we've made it this far, we know the user has a privledge level of "dasher"
    // see layout: https://www.notion.so/trentwiles/QuickWagon-Dasher-Queue-1cbb34a7509c80be8e8fd0692796513a
  }, [user]);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The Business
      </h1>
    </>
  );
}
