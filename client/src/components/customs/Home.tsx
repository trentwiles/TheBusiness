import { useAuth } from "./../auth/AuthProvider";
import WelcomeHero from "@/components/customs/snippets/WelcomeHero";
import { useEffect, useState } from "react";
import AvailableButtons from "./snippets/AvailableButtons";

import { toast } from "sonner";

export default function Home() {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [permLevel, setPermLevel] = useState("");

  useEffect(() => {
    if (user == undefined) {
      setIsPending(false);
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/me`,
      // not worried about passing an invalid token by accident
      {
        headers: {
          Authorization: user.token,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((apiData) => {
        setPermLevel(apiData.privledge_level)
        setIsPending(false);
      })
      .catch(() => {
        toast("got a non-200 response from API, see console");
        setIsPending(false);
      });
  }, [user]);

  return (
    <>
      {!isPending ? (
        user === undefined ? (
          <WelcomeHero />
        ) : (
          <>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {new Date().getHours() >= 0 && new Date().getHours() <= 6
                ? `Late night, huh ${user.username}?`
                : new Date().getHours() > 6 && new Date().getHours() <= 12
                ? `Good Morning, ${user.username}`
                : new Date().getHours() > 12 && new Date().getHours() <= 18
                ? `Good Afternoon, ${user.username}`
                : `Good Evening, ${user.username}`}
            </h2>
            <p>Debug: Perms level, </p>
            <AvailableButtons perm_level={permLevel} />
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
