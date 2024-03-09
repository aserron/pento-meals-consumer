import React from 'react';
import {Box, Button} from "@chakra-ui/react";

interface PagerBarProps {
    isLoading: boolean;
    total: number | null;
    totalPages: number | null;
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
}

const PagerBar: React.FC<PagerBarProps> = ({isLoading, total, totalPages, currentPage, prevPage, nextPage}) => {
    return (
        <Box className="pager" pt={2}>
            <div className="pager-found">
                Found: {total} Recipes
            </div>
            {totalPages && (totalPages > 0) && (
                <div className="pager-controls">
                    <Button onClick={prevPage} disabled={isLoading && (currentPage === 1)}>Prev</Button>
                    <span>{currentPage} / {totalPages}</span>
                    <Button onClick={nextPage} disabled={isLoading && (currentPage === totalPages)}>Next</Button>
                </div>
            )}
        </Box>
    );
};

export default PagerBar;
