import * as React from "react";

import Input from "@components/Input";
import { useReposContext } from "@pages/Main";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<Props> = ({ value, placeholder, onChange }) => {
  const reposContext = useReposContext();

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={reposContext.isLoading}
    />
  );
};

export default React.memo(SearchInput);
