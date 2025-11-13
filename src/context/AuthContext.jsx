import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

// 1. Initialize Context with a specific shape/null
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  // 2. THE FIX: Explicitly check if the context value is null.
  // If it is null, the component calling useAuth is NOT wrapped by AuthProvider.
  if (context === null) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Check your component tree (e.g., in App.jsx)."
    );
  }

  // If it's not null, return the context value (which contains currentUser, logout, etc.)
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    // This is a Firebase listener that sets the user state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup function
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    auth,
    logout,
  };

  // 3. Render the provider with the context value
  // Note: The Navbar issue is solved by making sure the Navbar is a child of THIS component in your App.jsx
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
