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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";


// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3pjjhao5HhdPfJRonDi6cQAwwPmM3KN0",
  authDomain: "bni-atm.firebaseapp.com",
  projectId: "bni-atm",
  storageBucket: "bni-atm.appspot.com",
  messagingSenderId: "1087416068939",
  appId: "1:1087416068939:web:36f4337c62b9747de496ce",
  measurementId: "G-FL067VKJ6W"
};

// Inicialização do app e autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Componente de SignUp
export function SignUp() {
  // Estados para armazenar os valores dos campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // ... restante do código

const handleSignUp = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.error("Email and password fields are required");
    // Adicione lógica adicional aqui para notificar o usuário sobre os campos obrigatórios
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Sign up successful for:", user);
    // Adicione lógica adicional aqui para lidar com o redirecionamento ou outras ações após o registro bem-sucedido
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign up failed with error:", errorMessage);
    // Adicione lógica adicional aqui para lidar com a exibição de mensagens de erro para o usuário
  }
};

// ... restante do código


  // Retorno do componente
  return (
    <>
      {/* Imagem de fundo e sobreposição */}
      <img
        src="http://www.bfa.ao/images/image-share.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      {/* Conteúdo do formulário */}
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Registo 
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* Campos de entrada para o nome, e-mail e senha */}
            <Input
              label="Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {/* Botão para registro */}
            <Button variant="gradient" fullWidth onClick={handleSignUp}>
              Cadastrar
            </Button>
            {/* Link para a página de login */}
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

// Exportação do componente SignUp
export default SignUp;
