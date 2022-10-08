import {
  isToday,
  isYesterday,
  isSameWeek,
  subDays,
  isThisMonth,
  subMonths,
  isSameMonth,
  format,
} from "date-fns";

export default function categorizeReviewByTime(isoString: string) {
  if (isToday(new Date(isoString))) {
    return "Today";
  } else if (isYesterday(new Date(isoString))) {
    return "Yesterday";
    //check if the review date and (current date - 2 days) is in the same week, starting from a Monday
  } else if (
    isSameWeek(new Date(isoString), subDays(new Date(), 2), {
      weekStartsOn: 1,
    })
  ) {
    return "This Week";
  } else if (isThisMonth(new Date(isoString))) {
    return "This Month";
    //check if the review date and (current date - 1 month) is in the same month
  } else if (isSameMonth(new Date(isoString), subMonths(new Date(), 1))) {
    return "Last Month";
  } else {
    //if it is older than any of the above, return string in format of "October 2022"
    return format(new Date(isoString), "MMMM yyyy");
  }
}
