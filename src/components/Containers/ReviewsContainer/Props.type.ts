import { SetStateAction } from "react";
import { ReviewsArrayType } from "./../../../types/ReviewType";

export type Props = {
  reviews: ReviewsArrayType;
  reviewsTimeCategories: string[];
  setThisPage: React.Dispatch<SetStateAction<number>>;
  thisPage: number;
  totalPages: number;
  totalReviews: number;
};
