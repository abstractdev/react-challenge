import { ReviewType, ReviewsArrayType } from "../../types/ReviewType";
import categorizeReviewByTime from "./categorizeReviewByTime";

export default function createUniqueTimeCategoriesArray(
  reviewsArray?: ReviewsArrayType,
  timeCategoriesArray?: string[]
) {
  const setReviewsArr = Array.from(
    new Set(
      reviewsArray?.map((e: ReviewType) =>
        //categorizeReviewByTime function takes an isoString date and returns a string time category
        categorizeReviewByTime(e.date)
      )
    )
  );
  if (timeCategoriesArray) {
    return Array.from(new Set([...timeCategoriesArray, ...setReviewsArr]));
  } else {
    return setReviewsArr;
  }
}
