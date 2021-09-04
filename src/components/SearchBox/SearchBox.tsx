import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";

import "./SearchBox.css";

type Props = {
  searchInputValue: string;
  handelOnChangeSearchInputValue: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handelOnClickSearchButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
};

const SearchBox: React.FC<Props> = ({
  searchInputValue,
  isLoading,
  handelOnChangeSearchInputValue,
  handelOnClickSearchButton,
}) => {
  return (
    <div className="searchBox">
      <Input
        value={searchInputValue}
        placeholder="Ведите название организации"
        onChange={handelOnChangeSearchInputValue}
        isEnabled={isLoading}
      />
      <Button onClick={handelOnClickSearchButton} isEnabled={isLoading}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
