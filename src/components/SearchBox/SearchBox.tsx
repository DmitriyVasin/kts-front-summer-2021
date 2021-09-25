import * as React from "react";

import styles from "./SearchBox.module.scss";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";

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
      <SearchInput
        value={searchInputValue}
        placeholder="Ведите название организации"
        onChange={handelOnChangeSearchInputValue}
      />
      <SearchButton />
    </div>
  );
};

export default SearchBox;
