import { LocalizationContextProvider } from "../contexts/localization-context/provider";

export const HobbyProjectsPage = (): JSX.Element => {
  return (
    <LocalizationContextProvider>
      <div>
        <h1>Hobby Projects Page</h1>
      </div>
    </LocalizationContextProvider>
  );
};
