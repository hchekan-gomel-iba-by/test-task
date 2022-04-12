import React from "react";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.message}>Welcome to the test app</p>
      </div>
    </div>
  );
};

export default Welcome;
