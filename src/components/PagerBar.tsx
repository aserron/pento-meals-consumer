import React from 'react';
import {Box, Button} from "@chakra-ui/react";

interface PagerBarProps {
  total: number | null;
  totalPages: number | null;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

const PagerBar: React.FC<PagerBarProps> = ({ total, totalPages, currentPage, prevPage, nextPage }) => {
  return (
    <Box className="pager" pt={2}>
      <div className="pager-found">
        Found: {total}
      </div>
      {totalPages && totalPages > 0 && (
        <div className="pager-controls">
          <Button onClick={prevPage} disabled={currentPage === 1}>Prev</Button>
          <span>{currentPage} / {totalPages}</span>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
        </div>
      )}
    </Box>
  );
};

export default PagerBar;
