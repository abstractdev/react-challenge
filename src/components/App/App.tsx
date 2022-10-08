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
import createArrayFromSet from "../../utils/helpers/createArrayFromSet";

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
        } else if (res && res.data.reviews.length) {
          setIsError(false);
          setIsResults(true);
          setTotalPages(res.data.pages);
          //createArrayFromSet takes an array as input and returns an array with a unique set of elements
          const arrayFromSet = createArrayFromSet(res.data.reviews);
          setReviewsTimeCategories([...arrayFromSet]);
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
          //createArrayFromSet takes an array as input and returns an array with a unique set of elements
          const arrayFromSet = createArrayFromSet(res.data.reviews);
          //update state by spreading existing state and paged data
          setReviewsTimeCategories([...reviewsTimeCategories, ...arrayFromSet]);
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
            <>{console.log(inputValue)}</>
            <>{console.log(ratingValue)}</>
          </form>
          {isError && <NetworkErrorMessage />}
          {isResults === false && <h2>NO RESULTS</h2>}
          <ReviewsContainer
            reviews={reviews}
            reviewsTimeCategories={reviewsTimeCategories}
            thisPage={thisPage}
            totalPages={totalPages}
            setThisPage={setThisPage}
          />
        </>
      )}
    </div>
  );
}
