import { ReviewType, ReviewsArrayType } from "../../types/ReviewType";
import categorizeReviewByTime from "./categorizeReviewByTime";

export default function createArrayFromSet(arr: ReviewsArrayType) {
  return Array.from(
    new Set(
      arr.map((e: ReviewType) =>
        //categorizeReview function takes an isoString date and returns a string time category
        categorizeReviewByTime(e.date)
      )
    )
  );
}
