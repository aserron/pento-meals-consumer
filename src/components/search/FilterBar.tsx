import React from "react";
import {FormControl, FormLabel, HStack} from "@chakra-ui/react";
import {CategorySelect} from "./CategorySelect";
import {AreaSelect} from "./AreaSelect";

export const FilterBar: React.FC<{
    initialValue: string,
    value: string,
    onCatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onAreaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({initialValue, value, onCatChange, onAreaChange}) => {

    return (
        <FormControl>
            <HStack>
                <FormLabel htmlFor="category">Filters:</FormLabel>
                <CategorySelect
                    initialValue={initialValue}
                    onChange={onCatChange}/>
                <AreaSelect
                    value={value}
                    onChange={onAreaChange}/>
            </HStack>
        </FormControl>
    );
}
