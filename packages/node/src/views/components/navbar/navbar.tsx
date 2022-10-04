import type { ContextMap } from "jsxte";
import { Link } from "jsxte-web-frames";
import { MainUrl } from "../../../routes/view-routes/main-urls";
import { Translation } from "../../../utilities/localization/dictionaries/keys";
import { useTranslation } from "../../contexts/localization-context/use-translation";
import { LanguageSelector } from "../language-selector/language-selector";

export const Navbar = (_: {}, context: ContextMap): JSX.Element => {
  const t = useTranslation(context);

  return (
    <nav class="navbar_box">
      <Link frameName="root" href={MainUrl.Home}>
        <p>{t(Translation.Home)}</p>
      </Link>
      <Link frameName="root" href={MainUrl.Career}>
        <p>{t(Translation.Career)}</p>
      </Link>
      <Link frameName="root" href={MainUrl.HobbyProjects}>
        <p>{t(Translation.HobbyProjects)}</p>
      </Link>
      <LanguageSelector />
    </nav>
  );
};
