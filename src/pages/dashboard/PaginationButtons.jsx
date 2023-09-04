import React from "react";

const PaginationButtons = ({
  handlePrevPage,
  handleNextPage,
  currentPage,
  lastItemIndex,
  totalItems,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={handleNextPage}
        disabled={lastItemIndex >= totalItems}
      >
        Próxima
      </button>
    </div>
  );
};

export default PaginationButtons;
