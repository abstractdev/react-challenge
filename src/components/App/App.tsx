import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import FilterInput from "../Inputs/FilterInput/FilterInput";
import FilterRatingSelect from "../Selects/FilterRatingSelect/FilterRatingSelect";
import ReviewsContainer from "../Containers/ReviewsContainer/ReviewsContainer";
import { ClipLoader } from "react-spinners";
import useDebouncer from "../../hooks/useDebouncer";
import { ReviewsArrayType } from "../../types/ReviewType";
import selectOptions from "../../utils/data/optionsArray";
import { getReviews } from "../../axios/getReviews";
import NetworkErrorMessage from "../Errors/NetworkErrorMessage/NetworkErrorMessage";
import createUniqueTimeCategoriesArray from "../../utils/helpers/createUniqueTimeCategoriesArray";

export default function App() {
  const [reviews, setReviews] = useState<ReviewsArrayType>([]);
  const [reviewsTimeCategories, setReviewsTimeCategories] = useState<string[]>(
    []
  );
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [thisPage, setThisPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedValue = useDebouncer(inputValue, 500);
  const [selected, setSelected] = useState(selectOptions[0].value);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isResults, setIsResults] = useState<boolean | null>(null);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (debouncedValue || ratingValue) {
      setIsLoading(true);
      setThisPage(1);
      (async () => {
        const res = await getReviews(
          debouncedValue,
          ratingValue,
          1,
          setIsError
        );
        if (res && !res.data.reviews.length) {
          setIsError(false);
          setIsResults(false);
          setIsLoading(false);
          setReviews([]);
          setReviewsTimeCategories([]);
          setThisPage(0);
          setTotalPages(0);
          setTotalReviews(0);
        } else if (res && res.data.reviews.length) {
          setIsError(false);
          setIsResults(true);
          setTotalPages(res.data.pages);
          setTotalReviews(res.data.total);
          //createUniqueTimeCategoriesArray takes an array of reviews as input and returns an array with unique time category elements
          setReviewsTimeCategories(
            createUniqueTimeCategoriesArray(res.data.reviews)
          );
          setReviews([...res.data.reviews]);
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      })();
    }
  }, [debouncedValue, ratingValue]);

  useEffect(() => {
    if (thisPage > 1) {
      setIsLoading(true);
      (async () => {
        const res = await getReviews(
          debouncedValue,
          ratingValue,
          thisPage,
          setIsError
        );
        if (res && !res.data.reviews.length) {
          setIsError(false);
          setIsResults(false);
          setIsLoading(false);
        } else if (res && res.data.reviews.length) {
          setIsError(false);
          setIsResults(true);
          //createUniqueTimeCategoriesArray takes an array of reviews as input and returns an array with unique time category elements
          setReviewsTimeCategories(
            createUniqueTimeCategoriesArray(
              res.data.reviews,
              reviewsTimeCategories
            )
          );
          //update reviews state by spreading existing state and paged data
          setReviews([...reviews, ...res.data.reviews]);
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      })();
    }
  }, [thisPage]);

  return (
    <div className={styles.App}>
      {isLoading && !isError ? (
        <ClipLoader
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
        />
      ) : (
        <>
          <img className={styles.img} src="/elon.jpg" alt="Elon Musk" />
          <form className={styles.form}>
            <FilterInput
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            <FilterRatingSelect
              setRatingValue={setRatingValue}
              selected={selected}
              setSelected={setSelected}
            />
          </form>
          {isError && <NetworkErrorMessage />}
          {isResults === false && <h1>NO RESULTS</h1>}
          {isResults && (
            <ReviewsContainer
              reviews={reviews}
              reviewsTimeCategories={reviewsTimeCategories}
              thisPage={thisPage}
              totalPages={totalPages}
              setThisPage={setThisPage}
              totalReviews={totalReviews}
            />
          )}
        </>
      )}
    </div>
  );
}
