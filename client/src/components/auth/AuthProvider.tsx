import { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  user?: { username: string; token: string };
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<{username: string, token: string}>();

  // send data here after the successful HTTP authentication has been made
  // ** WARNING ** provides no validation in and of itself
  // you'll have to send the token to the backend to ensure it is legit
  const login = (username: string, token: string) => {
    const userData = {username: username, token: token}
    setUser(userData);
    localStorage.setItem("token", JSON.stringify(userData));
  };

  // call on Logout route
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
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