import { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  user?: { username: string; token: string };
  login: (username: string, token: string) => void;
  logout: () => void;
};

import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<{ username: string; token: string }>();

  // send data here after the successful HTTP authentication has been made
  // ** WARNING ** provides no validation in and of itself
  // you'll have to send the token to the backend to ensure it is legit
  const login = (username: string, token: string) => {
    const userData = { username: username, token: token };
    setUser(userData);
    localStorage.setItem("token", JSON.stringify(userData));

    toast("Welcome back, you have been logged in.");
  };

  // call on Logout route
  const logout = () => {
    if (user == undefined) {
      localStorage.removeItem("token");
      toast(
        "Not quite sure why you'd log out while already logged out, but hey, you do you."
      );
    } else {
      setUser(undefined);
      localStorage.removeItem("token");

      toast("You have been logged out.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("sorry, useAuth must be used within an AuthProvider");
  }
  return context;
};
