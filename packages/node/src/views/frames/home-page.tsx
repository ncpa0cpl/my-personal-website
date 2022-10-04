import { LocalizationContextProvider } from "../contexts/localization-context/provider";

export const HomePage = (): JSX.Element => {
  return (
    <LocalizationContextProvider>
      <div>
        <h1>Home Page</h1>
      </div>
    </LocalizationContextProvider>
  );
};
