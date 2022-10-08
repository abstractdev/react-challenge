import React from "react";
import styles from "./ReviewCard.module.scss";
import { Props } from "./Props.type";
import ReactStars from "react-stars";
import formatRating from "../../../utils/helpers/formatRating";

export default function ReviewCard({ ...props }: Props) {
  const cardData = Object.entries(props);
  return (
    <>
      {cardData.map((e, i) => {
        if (e[0] === "stars") {
          return (
            <div key={i + e[1]}>
              <ReactStars
                count={5}
                value={formatRating(e[1])}
                size={16}
                color1={"gray"}
                color2={"#ffd700"}
                edit={false}
              />
            </div>
          );
        } else if (e[0] === "title") {
          return <h3 key={i + e[1]}>{e[1]}</h3>;
        } else if (e[0] === "author") {
          return (
            <small key={i + e[1]} className={styles.author}>{`by ${e[1]} on ${
              cardData[i + 1][1]
            }`}</small>
          );
        } else if (e[0] === "date") {
          return <React.Fragment key={i + e[1]}></React.Fragment>;
        } else {
          return <p key={i + e[1]}>{e[1]}</p>;
        }
      })}
    </>
  );
}
