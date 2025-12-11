// context/AuthContext.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContextProvider";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
