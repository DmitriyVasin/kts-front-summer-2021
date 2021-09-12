import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";

import styles from "./SearchBox.module.scss";

type Props = {
  searchInputValue: string;
  handelOnChangeSearchInputValue: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
