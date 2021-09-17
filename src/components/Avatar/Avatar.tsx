<<<<<<< HEAD
import * as React from "react";

import styles from "./Avatar.module.scss";

type Props = {
  src?: string;
  alt: string;
  letter: string;
};

const Avatar: React.FC<Props> = ({ src, alt, letter }) => {
  return (
    <div className={styles.avatar}>
      {src ? <img src={src} alt={alt} /> : <span>{letter}</span>}
    </div>
  );
};

export default Avatar;
=======
import * as React from "react";

import "./Avatar.css";

type Props = {
  src?: string;
  alt: string;
  letter: string;
};

const Avatar: React.FC<Props> = ({ src, alt, letter }) => {
  return (
    <div className="avatar">
      {src ? <img src={src} alt={alt} /> : <span>{letter}</span>}
    </div>
  );
};

export default Avatar;
>>>>>>> main
