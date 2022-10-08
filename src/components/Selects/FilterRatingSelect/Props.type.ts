import { SetStateAction } from "react";

export type Props = {
  setRatingValue: React.Dispatch<SetStateAction<string | null>>;
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
};
