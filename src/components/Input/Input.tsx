import * as React from "react";

import styles from "./Input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

const Input: React.FC<Props> = ({ value, placeholder, onChange, disabled }) => {
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
      disabled={disabled}
    />
  );
};

export default React.memo(Input);
