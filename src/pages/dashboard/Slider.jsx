import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./Slider.css";
import { apiUrl } from "../../apiConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => { 
  const [atms, setAtms] = useState([]);

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

  return (
    <div className="slider-container">
      <div className="button-container">
        <button className="button" onClick={previous}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button className="button" onClick={next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
        {atms.map((atm, index) => (
          <div className={`slide ${getProblemDescription(atm)}`} key={index}>
            <p>
              | {atm.name}&nbsp;| Problema: {getProblemDescription(atm)}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slide;
