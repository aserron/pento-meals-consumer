import React from "react";

export interface SearchInputParams {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<
    SearchInputParams
> = ({onChange}) => <input type={"text"} onChange={onChange}/>;

export default SearchInput;
