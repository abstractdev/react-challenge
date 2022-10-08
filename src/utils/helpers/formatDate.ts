import { format } from "date-fns";

export default function formatDate(isoString: string) {
  return format(new Date(isoString), "MM/dd/yyyy");
}
