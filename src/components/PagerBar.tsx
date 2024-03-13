import React from 'react';
import {Box, Button} from "@chakra-ui/react";

interface PagerBarProps {
    isLoading: boolean;
    total: number | null;
    totalPages: number | null;
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
    goToPage: (page: number) => void;

}

const PagerBar: React.FC<
    PagerBarProps
> = ({
         isLoading, total,
         totalPages,
         currentPage, goToPage,
         prevPage, nextPage
     }
) => {
    const showPager = totalPages && (totalPages > 0);

    return (
        <Box className="pager" pt={2} pb={4} >
            {showPager && (<>
                <div className="pager-controls">
                    
                    <Button
                        onClick={(e: any) => goToPage(1)}
                    >First</Button>
                    
                    <Button onClick={prevPage} disabled={isLoading && (currentPage === 1)}>Prev</Button>
                    <span>{currentPage} / {totalPages}</span>
                    <Button onClick={nextPage} disabled={isLoading && (currentPage === totalPages)}>Next</Button>
                </div>
            </>)}
        </Box>
    );
};

export default PagerBar;
