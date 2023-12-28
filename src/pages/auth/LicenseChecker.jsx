import React, { useEffect } from "react";

const LicenseChecker = ({ licenseKey, interval }) => {
  useEffect(() => {
    const verificarLicenca = async (chaveDaLicenca) => {
      try {
        const resposta = await fetch("https://seuservidor.com/verificarLicenca", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chave: chaveDaLicenca }),
        });

        const dados = await resposta.json();
        if (!dados.licencaValida) {
          // Lógica para tratar o caso em que a licença expirou
          // Por exemplo, você pode redirecionar o usuário para uma página de renovação ou exibir um aviso.
          console.log("Sua licença expirou. Entre em contato para renová-la.");
        }
      } catch (erro) {
        console.error("Erro ao verificar a licença: ", erro);
      }
    };

    const intervalId = setInterval(async () => {
      await verificarLicenca(licenseKey);
    }, interval);

    return () => clearInterval(intervalId);
  }, [licenseKey, interval]);

  return <div>Verificando a licença...</div>;
};

export default LicenseChecker;
