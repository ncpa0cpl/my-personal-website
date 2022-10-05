import { LocalizationContextProvider } from "../../contexts/localization-context/provider";

export const CareerPage = (): JSX.Element => {
  return (
    <LocalizationContextProvider>
      <div>
        <h1>Career Page</h1>
      </div>
    </LocalizationContextProvider>
  );
};
