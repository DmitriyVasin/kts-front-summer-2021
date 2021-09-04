import * as React from "react";

import "./Button.css";

type Props = React.PropsWithChildren<{
  isEnabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>;

const Button: React.FC<Props> = ({ onClick, isEnabled, children }) => {
  return (
    <button className="searchButton" onClick={onClick} disabled={isEnabled}>
      {children}
    </button>
  );
};

export default Button;
