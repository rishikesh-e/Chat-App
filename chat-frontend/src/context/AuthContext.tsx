import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userId: string;
  token: string;
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  token: "",
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
