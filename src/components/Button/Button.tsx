import * as React from "react";

import { useReposContext } from "@pages/Main";

import styles from "./Button.module.scss";

const Button: React.FC = ({ children }) => {
  const reposContext = useReposContext();
  return (
    <button
      className={styles.searchButton}
      onClick={reposContext.load}
      disabled={reposContext.isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
