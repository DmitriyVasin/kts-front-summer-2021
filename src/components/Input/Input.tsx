import * as React from "react";

import "./Input.css";

type Props = {
  value: string;
  placeholder: string;
  isEnabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({
  value,
  placeholder,
  isEnabled,
  onChange,
}) => {
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className="searchInput"
      onChange={onChange}
      disabled={isEnabled}
    />
  );
};

export default Input;
