import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Slider.css";
import { apiUrl } from "../../apiConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
  const [atms, setAtms] = useState([]);
  const [selectedATM, setSelectedATM] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const filteredAtms = response.data.filter(
          (atm) =>
            atm.cash < 30000 || atm.coins < 800 || atm.systemStatus === "of"
        );
        setAtms(filteredAtms);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchData();
  }, []);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    className: "slide variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    adaptiveHeight: true,
    arrows: true,
  };

  const getProblemDescription = (atm) => {
    const problems = [];

    if (atm.cash < 30000) {
      problems.push("Pouco Dinheiro");
    }
    if (atm.coins < 1000) {
      problems.push("Pouco Papel");
    }
    if (atm.systemStatus === "of") {
      problems.push("Sem Sistema");
    }

    return problems.length <= 0
      ? "Nenhum Problema Conhecido"
      : problems.join(", ");
  };

  const handleOpenModal = (atm) => {
    setSelectedATM(atm);
  };

  const handleCloseModal = () => {
    setSelectedATM(null);
  };

  const goToNextSlide = () => {
    sliderRef.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="slider-container">
      <div className="slider-navigation">
        <button className="slider-button" onClick={goToPrevSlide}>
          {"<"}
        </button>
        <button className="slider-button" onClick={goToNextSlide}>
          {">"}
        </button>
      </div>
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
        {atms.map((atm, index) => (
          <div className={`slide ${getProblemDescription(atm)}`} key={index}>
            <p>
              | {atm.name}&nbsp;| Problema: {getProblemDescription(atm)}
              <button
                className="modal-button ml-2 rounded-md bg-blue-500 px-2 py-1 text-white"
                onClick={() => handleOpenModal(atm)}
              >
                Ver Detalhes
              </button>
            </p>
          </div>
        ))}
      </Slider>
      {selectedATM && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
          <div className="w-96 rounded-lg bg-white p-4 font-semibold">
            <h2 className="mb-3 pb-4 text-xl font-bold">Detalhes do ATM</h2>
            <p className="pb-2">ID: {selectedATM.id}</p>
            <p className="pb-2">Nome: {selectedATM.name}</p>
            <p className="border-b pb-4">Localização: {selectedATM.location}</p>

            {selectedATM.integrity < 50 && (
              <p className="border-b pb-2 text-red-500">
                A integridade está muito baixa e necessita de assistência.
              </p>
            )}

            {selectedATM.cash < 70000 && (
              <p className="border-b pb-2 text-red-500">
                Necessita de recarga (dinheiro abaixo de 70000).
              </p>
            )}

            {selectedATM.cash > 70000 && (
              <p className="border-b pb-2 text-green-500">
                Tem Dinheiro suficiente.
              </p>
            )}

            {selectedATM.cash > 500 && (
              <p className="border-b pb-2 text-green-500">
                Tem Papel suficiente.
              </p>
            )}

            {selectedATM.coins < 500 && (
              <p className="border-b pb-2 text-red-500">
                Necessita de recarga de papel (papel abaixo de 500).
              </p>
            )}

            {selectedATM.systemStatus === "on" && (
              <p className="border-b pb-2 text-green-500">
                O sistema está ligado e funcionando normalmente.
              </p>
            )}

            {selectedATM.systemStatus === "of" && (
              <p className="border-b pb-2 text-red-500">
                O ATM está sem sistema, necessita de assistência urgente.
              </p>
            )}

            <Link
              to={`/dashboard/search/${selectedATM.id}`}
              className="more-info-button ml-2 rounded-md bg-green-500 px-2 py-1 text-white"
            >
              Mais Informações
            </Link>

            <button
              className="mt-4 rounded-md bg-red-500 px-2 py-1 text-white"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide;
