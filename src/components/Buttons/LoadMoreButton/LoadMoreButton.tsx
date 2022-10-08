import React from "react";
import styles from "./LoadMoreButton.module.scss";
import { Props } from "./Props.type";

export default function LoadMoreButton({ setThisPage }: Props) {
  const handleClick = () => {
    setThisPage((prev: number) => prev + 1);
  };
  return (
    <button className={styles.button} onClick={handleClick}>
      Load More
    </button>
  );
}
