import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ================= LOGIN FUNCTION =================
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://onlinebusticketreservationsystem-production.up.railway.app/api/login/",
        {
          email,
          password,
        }
      );

      // store user/token if backend sends it
      setUser(res.data.user || res.data);

      localStorage.setItem("user", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      throw error;
    }
  };

  // ================= CHECK AUTH =================
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,              // ✅ FIX ADDED HERE
        showLogin,
        showSignup,
        setShowLogin,
        setShowSignup,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}