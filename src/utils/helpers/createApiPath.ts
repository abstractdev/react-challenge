export default function createApiPath(
  page: number,
  debouncedValue?: string | null,
  ratingValue?: string | null
) {
  //guard clause so undefined parameters do not effect conditional
  if (
    ratingValue === undefined ||
    debouncedValue === undefined ||
    page === undefined
  )
    return;
  //if user has entered a search term and truthy ratingValue has been selected, query for both q and stars
  if (debouncedValue && ratingValue) {
    return `/twitter-reviews?q=${debouncedValue}&stars=${ratingValue}&page=${page}&sort=-date`;
    //if user has entered a search term and ratingValue is null or empty string, then user wants all ratings for their search input
  } else if (debouncedValue && !ratingValue) {
    return `/twitter-reviews?q=${debouncedValue}&page=${page}&sort=-date`;
    //if ratingValue is empty string, user has selected "all ratings"
  } else if (ratingValue === "") {
    return `/twitter-reviews?page=${page}&sort=-date`;
    //if ratingValue is truthy, user has selected a rating
  } else if (ratingValue) {
    return `/twitter-reviews?stars=${ratingValue}&page=${page}&sort=-date`;
  }
}
