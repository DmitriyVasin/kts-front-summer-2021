import * as React from "react";

import { useReposContext } from "@pages/Main";

import styles from "./Input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ value, placeholder, onChange }) => {
  const reposContext = useReposContext();
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className={styles.searchInput}
      onChange={onChange}
      disabled={reposContext.isLoading}
    />
  );
};

export default Input;
