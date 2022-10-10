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
            <React.Fragment key={props.id + e[0]}>
              <ReactStars
                count={5}
                value={formatRating(e[1])}
                size={16}
                color1={"gray"}
                color2={"#ffd700"}
                edit={false}
              />
            </React.Fragment>
          );
        } else if (e[0] === "title") {
          return (
            <React.Fragment key={props.id + e[0]}>
              <h3>{e[1]}</h3>
            </React.Fragment>
          );
        } else if (e[0] === "author") {
          return (
            <React.Fragment key={props.id + e[0]}>
              <small className={styles.author}>{`by ${e[1]} on ${
                cardData[i + 1][1]
              }`}</small>
            </React.Fragment>
          );
        } else if (e[0] === "date" || e[0] === "id") {
          return <React.Fragment key={props.id + e[0]}></React.Fragment>;
        } else {
          return (
            <React.Fragment key={props.id + e[0]}>
              <p>{e[1]}</p>
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
