import { SetStateAction } from "react";
import createApiPath from "../utils/helpers/createApiPath";
import api from "./api";

export async function getReviews(
  debouncedValue: string | null,
  ratingValue: string | null,
  page: number,
  setIsError: React.Dispatch<SetStateAction<boolean | null>>
) {
  const res = await api
    .get(createApiPath(page, debouncedValue, ratingValue) ?? "")
    .catch(function (error) {
      if (error) {
        setIsError(true);
      }
    });
  return res;
}
