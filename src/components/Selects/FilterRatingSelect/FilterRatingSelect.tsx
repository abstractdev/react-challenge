import React from "react";
import styles from "./FilterRatingSelect.module.scss";
import optionsArray from "../../../utils/data/optionsArray";
import { Props } from "./Props.type";

export default function FilterRatingSelect({
  setRatingValue,
  selected,
  setSelected,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    setRatingValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="filterRatingSelect">Filter by rating</label>
      <select
        name="filterRatingSelect"
        value={selected}
        onChange={(event) => handleChange(event)}
      >
        {optionsArray.map((e) => (
          <option key={e.value} value={e.value}>
            {e.text}
          </option>
        ))}
      </select>
    </div>
  );
}
