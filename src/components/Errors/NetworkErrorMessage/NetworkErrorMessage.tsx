import React from "react";
import styles from "./NetworkErrorMessage.module.scss";

export default function NetworkErrorMessage() {
  return (
    <span className={styles["network-error-message"]}>
      Network request failed
    </span>
  );
}
