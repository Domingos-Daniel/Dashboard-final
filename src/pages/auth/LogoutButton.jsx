import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";

const LogoutButton = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout bem-sucedido
        toast.success("Logout successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        // Tratamento de erros no logout
        toast.error(`Logout failed with error: ${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex items-center justify-center">
     {/* Exiba o email do usuário */}
     {localStorage.getItem("userEmail") && (
        <p className="font-bold text-gray-700 mr-4">Olá, {localStorage.getItem("userEmail")}</p>
      )}
      <Button color="red" onClick={handleLogout}>
        Sair
      </Button>
      <ToastContainer />
    </div>
  );
};

export default LogoutButton;
