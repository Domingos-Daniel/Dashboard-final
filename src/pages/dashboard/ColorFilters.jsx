import React from "react";

function ColorFilters({ setFilterByColor }) {
  const handleFilterClick = (color) => {
    setFilterByColor(color);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => handleFilterClick("verde")} color="green" size="sm">
        Verde
      </Button>
      <Button onClick={() => handleFilterClick("amarelo")} color="yellow" size="sm">
        Amarelo
      </Button>
      <Button onClick={() => handleFilterClick("vermelho")} color="red" size="sm">
        Vermelho
      </Button>
      <Button onClick={() => setFilterByColor(null)} color="gray" size="sm">
        Limpar Filtro
      </Button>
    </div>
  );
}

export default ColorFilters;
