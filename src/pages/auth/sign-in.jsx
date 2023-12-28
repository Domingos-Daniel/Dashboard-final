import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3pjjhao5HhdPfJRonDi6cQAwwPmM3KN0",
  authDomain: "bni-atm.firebaseapp.com",
  projectId: "bni-atm",
  storageBucket: "bni-atm.appspot.com",
  messagingSenderId: "1087416068939",
  appId: "1:1087416068939:web:36f4337c62b9747de496ce",
  measurementId: "G-FL067VKJ6W",
};

// Inicialização do app e autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        toast.success("Login bem-sucedido!");
        localStorage.setItem("userEmail", email);
        console.log("Login bem sucedido para:", email);
        // Adicione lógica adicional aqui para lidar com o redirecionamento ou outras ações após o login bem-sucedido
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Falha no login: ${errorMessage}`);
        console.error("Login falhou com o erro:", errorMessage);
        // Adicione lógica adicional aqui para lidar com a exibição de mensagens de erro para o usuário
      });
  };
  //https://www.verangola.net/va/images/cms-image-000018011.jpg
  return (
    <>
      <ToastContainer />
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/d329ae104730575.5f69b0c1589e9.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Lembrar-me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              color="green"
              variant="gradient"
              fullWidth
              onClick={handleSignIn}
            >
              Entrar
            </Button>
            <Typography
              variant="small"
              className="mt-6 flex hidden justify-center"
            >
              Novo por aqui?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Cadastrar
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
