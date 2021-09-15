import * as React from "react";

import { useReposContext } from "@pages/Main";

import styles from "./Input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Input: React.FC<Props> = ({ value, placeholder, onChange }) => {
  const reposContext = useReposContext();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className={styles.searchInput}
      onChange={onChangeInput}
      disabled={reposContext.isLoading}
    />
  );
};

export default React.memo(Input);
