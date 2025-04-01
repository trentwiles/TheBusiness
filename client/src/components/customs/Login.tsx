import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

type props = {
  enableCreateAccount: boolean;
  enableOauth: boolean;
};

export default function Login({ enableCreateAccount, enableOauth }: props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [loginFailureMessage, setLoginFailureMessage] = useState(null);

  // first things first, if the user is already authenticated, kick
  // them off this page
  useEffect(() => {
    fetch("http://localhost:5000", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    }).then((response) => {
      // if the user is authorized we get a 200
      if (response.status == 200) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  function handleFormSubmit(e, email: string, password: string) {
    e.preventDefault();

    // reset login failure message
    setLoginFailureMessage(null);

    // blank out email & password in state
    setEmail("");
    setPassword("");

    // disable button
    setButtonEnabled(false);

    // submit the login and act based on response from server
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: email,
        password: password,
      }),
    }).then((response) => {
      setLoginFailureMessage(null);
      response.json().then((data) => {
        if (response.status != 200) {
          setButtonEnabled(true);
          setLoginFailureMessage(data.error_msg);
        } else {
          // was a success
          // handle the token here
          console.log(`success, your token is ${data.token}`);
          localStorage.setItem("token", data.token);

          navigate("/", { replace: true });
        }
      });
    });
  }

  return (
    // 3 rows on desktop
    // 1 row on mobile
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
      <div className="dummy1"></div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="test@trentwil.es"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={(e) => handleFormSubmit(e, email, password)}
                  disabled={!buttonEnabled}
                >
                  {/* {buttonEnabled ? "Login" : "Loading..."} */}
                  Login
                </Button>
                {enableCreateAccount ? (
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                ) : (
                  <></>
                )}
                {loginFailureMessage && (
                  <span style={{ color: "red" }}>{loginFailureMessage}</span>
                )}
              </div>
              {enableOauth ? (
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              ) : (
                <></>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="dummy2"></div>
    </div>
  );
}
