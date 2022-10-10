import React from "react";
import styles from "./ReviewsContainer.module.scss";
import { ReviewType } from "../../../types/ReviewType";
import categorizeReview from "../../../utils/helpers/categorizeReviewByTime";
import LoadMoreButton from "../../Buttons/LoadMoreButton/LoadMoreButton";
import ReviewCard from "../../Cards/ReviewCard/ReviewCard";
import { Props } from "./Props.type";
import formatDate from "../../../utils/helpers/formatDate";

export default function ReviewsContainer({
  reviews,
  reviewsTimeCategories,
  thisPage,
  totalPages,
  setThisPage,
  totalReviews,
}: Props) {
  return (
    <>
      <h1
        className={styles["total-reviews"]}
      >{`Showing ${totalReviews} reviews`}</h1>
      {reviewsTimeCategories?.map((e: string) => {
        return (
          <React.Fragment key={e}>
            <h1>{e}</h1>
            <main className={styles["reviews-container"]}>
              {reviews?.map((f: ReviewType) => {
                return (
                  <React.Fragment key={f.id}>
                    {categorizeReview(f.date) === e && (
                      <div className={styles["card-container"]}>
                        <ReviewCard
                          id={f.id}
                          stars={f.stars}
                          title={f.title}
                          review={f.review}
                          author={f.author}
                          date={formatDate(f.date)}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </main>
          </React.Fragment>
        );
      })}
      {totalPages > thisPage && <LoadMoreButton setThisPage={setThisPage} />}
    </>
  );
}
