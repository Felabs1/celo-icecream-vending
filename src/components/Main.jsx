import React from "react";
import styles from "./main.module.css";
const Main = ({ children }) => {
  return (
    <div className={styles.main}>
      <br />
      {children}
    </div>
  );
};

export default Main;
