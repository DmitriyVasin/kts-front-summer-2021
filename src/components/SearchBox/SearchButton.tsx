import * as React from "react";

import Button from "@components/Button";
import SearchIcon from "@components/SearchIcon";
import { useReposContext } from "@pages/Main";

const SearchButton: React.FC = ({ children }) => {
  const reposContext = useReposContext();
  return (
    <Button onClick={reposContext.load} disabled={reposContext.isLoading}>
      <SearchIcon />
    </Button>
  );
};

export default React.memo(SearchButton);
