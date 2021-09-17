<<<<<<< HEAD
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
=======
import * as React from "react";

import "./Input.css";

type Props = {
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

const Input: React.FC<Props> = ({ value, placeholder, disabled, onChange }) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className="searchInput"
      onChange={onChangeInput}
      disabled={disabled}
    />
  );
};

export default React.memo(Input);
>>>>>>> main
