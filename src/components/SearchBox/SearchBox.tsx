<<<<<<< HEAD
import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";

import styles from "./SearchBox.module.scss";

type Props = {
  searchInputValue: string;
  handelOnChangeSearchInputValue: (value: string) => void;
};

const SearchBox: React.FC<Props> = ({
  searchInputValue,
  handelOnChangeSearchInputValue,
}) => {
  return (
    <div className={styles.searchBox}>
      <Input
        value={searchInputValue}
        placeholder="Ведите название организации"
        onChange={handelOnChangeSearchInputValue}
      />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
=======
import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";

import "./SearchBox.css";

type Props = {
  searchInputValue: string;
  handelOnChangeSearchInputValue: (value: string) => void;
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
        disabled={isLoading}
      />
      <Button onClick={handelOnClickSearchButton} disabled={isLoading}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
>>>>>>> main
