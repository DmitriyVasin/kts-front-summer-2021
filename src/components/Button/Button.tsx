<<<<<<< HEAD
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
=======
import * as React from "react";

import "./Button.css";

type Props = React.PropsWithChildren<{
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>;

const Button: React.FC<Props> = ({ onClick, disabled, children }) => {
  return (
    <button className="searchButton" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
>>>>>>> main
