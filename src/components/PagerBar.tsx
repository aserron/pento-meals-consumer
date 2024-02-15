import React from 'react';

interface PagerBarProps {
  total: number | null;
  totalPages: number | null;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

const PagerBar: React.FC<PagerBarProps> = ({ total, totalPages, currentPage, prevPage, nextPage }) => {
  return (
    <div className="pager">
      <div className="pager-found">
        Found: {total}
      </div>
      {totalPages && totalPages > 0 && (
        <div className="pager-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default PagerBar;
