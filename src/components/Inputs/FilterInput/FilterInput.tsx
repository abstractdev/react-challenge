import React from "react";
import styles from "./FilterInput.module.scss";
import { Props } from "./Props.type";

export default function FilterInput({ inputValue, setInputValue }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="filterInput">Filter by keyword</label>
      <input
        className={styles["filter-input"]}
        name="filterInput"
        placeholder=""
        type="text"
        value={inputValue ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
