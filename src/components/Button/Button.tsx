import * as React from "react";

import styles from "./Button.module.scss";

type Props = {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<Props> = ({ disabled, onClick, children }) => {
  return (
    <button
      className={styles.searchButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
