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
