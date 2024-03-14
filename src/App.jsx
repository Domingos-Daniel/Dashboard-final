import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseConfig  from "@/pages/dashboard/firebaseConfig";

// Inicialização do Firebase
const auth = getAuth();

// Função de verificação de autenticação
const isAuthenticated = () => {
  return !!auth.currentUser;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user && window.location.pathname !== "/auth/sign-in") {
        window.location.href = "/auth/sign-in";
      }
    });

    // Clean up the unsubscribe function and sign out the user when the component unmounts
    return () => {
      unsubscribe();
      signOut(auth);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated() ? (
            <Dashboard />
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/auth/*"
        element={
          !isAuthenticated() ? (
            <Auth />
          ) : (
            <Navigate to="/dashboard/home" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;