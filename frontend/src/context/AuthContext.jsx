import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Keep user logged in on refresh — with safe JSON parse
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      // Check for common invalid values like undefined, null, or empty string
      if (storedUser && storedUser !== "undefined" && storedUser !== "null" && storedUser !== "") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.warn("⚠️ Failed to parse user from localStorage:", error.message);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    if (!userData || typeof userData !== "object") return;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
