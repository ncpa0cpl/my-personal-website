import type { ContextMap } from "jsxte";
import { AppRoutes } from "../../../app-routes";
import { Translation } from "../../../localization/dictionaries/keys";
import { useTranslation } from "../../contexts/localization-context/use-translation";
import { LanguageSelector } from "../language-selector/language-selector";
import { LinkButton } from "../link-button/link-button";
import { Svg } from "../svg/svg";
import { ThemeSwitch } from "../theme-switch/theme-switch";

export const Navbar = (_: {}, context: ContextMap): JSX.Element => {
  const t = useTranslation(context);

  return (
    <>
      <nav id="navbar" class="navbar">
        <div class="navbar-mobile-only-close-btn_element">
          <a href="#navbar-closed">
            <Svg name="close" />
          </a>
        </div>
        <div class="navbar-links-section_element">
          <LinkButton frameName="root" href={AppRoutes.home.$()}>
            <p>{t(Translation.Home)}</p>
          </LinkButton>
          <LinkButton frameName="root" href={AppRoutes.career.$()}>
            <p>{t(Translation.Career)}</p>
          </LinkButton>
          <LinkButton frameName="root" href={AppRoutes.projects.$()}>
            <p>{t(Translation.HobbyProjects)}</p>
          </LinkButton>
        </div>
        <div class="navbar-non-links-section_element">
          <ThemeSwitch
            darkThemeIcon="dark-theme"
            lightThemeIcon="light-theme"
            label={t(Translation.ChangeTheme)}
          />
          <LanguageSelector />
        </div>
      </nav>
      <div class="navbar-mobile-only-open-btn-container_box">
        <a href="#navbar">
          <Svg name="menu-burger" />
        </a>
      </div>
    </>
  );
};
