import type { ContextMap } from "jsxte";
import { MainUrl } from "../../../routes/view-routes/main-urls";
import { Translation } from "../../../utilities/localization/dictionaries/keys";
import { useTranslation } from "../../contexts/localization-context/use-translation";
import { LanguageSelector } from "../language-selector/language-selector";
import { LinkButton } from "../link-button/link-button";
import { ThemeSwitch } from "../theme-switch/theme-switch";

export const Navbar = (_: {}, context: ContextMap): JSX.Element => {
  const t = useTranslation(context);

  return (
    <nav class="navbar_box">
      <LinkButton frameName="root" href={MainUrl.Home}>
        <p>{t(Translation.Home)}</p>
      </LinkButton>
      <LinkButton frameName="root" href={MainUrl.Career}>
        <p>{t(Translation.Career)}</p>
      </LinkButton>
      <LinkButton frameName="root" href={MainUrl.HobbyProjects}>
        <p>{t(Translation.HobbyProjects)}</p>
      </LinkButton>
      <ThemeSwitch darkThemeIcon="dark-theme" lightThemeIcon="light-theme" />
      <LanguageSelector />
    </nav>
  );
};
