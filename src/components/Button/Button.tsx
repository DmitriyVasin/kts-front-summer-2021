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
