import { SetStateAction } from "react";

export type Props = {
  inputValue: string | null;
  setInputValue: React.Dispatch<SetStateAction<string | null>>;
};
