import React from "react";

const PaginationButtons = ({
  handlePrevPage,
  handleNextPage,
  handlePageChange,
  currentPage,
  lastItemIndex,
  totalItems,
  itemsPerPage,
}) => {
  // Verifica se totalItems e itemsPerPage são números válidos
  const isValidNumber = (num) => typeof num === "number" && num > 0;

  // Calcula o número total de páginas se totalItems e itemsPerPage forem números válidos
  const totalPages =
    isValidNumber(totalItems) && isValidNumber(itemsPerPage)
      ? Math.max(Math.ceil(totalItems / itemsPerPage), 1)
      : 1; // Garante que o totalPages seja pelo menos 1

  // Gera números de página para renderização
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        className={`mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 ${
          currentPage === i ? "bg-blue-600" : ""
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="mt-4 flex justify-center">
      <button
        className="hover.bg-blue-600 mr-2 rounded bg-blue-500 py-2 px-4 text-white"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pageNumbers}
      <button
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        onClick={handleNextPage}
        disabled={lastItemIndex >= totalItems}
      >
        Próxima
      </button>
      {/*<p className="mx-4 text-gray-700">
        Página {currentPage} de {totalPages}
  </p>*/}
    </div>
  );
};

export default PaginationButtons;
