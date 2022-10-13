import type { ContextMap } from "jsxte";
import { Link } from "jsxte-web-frames";
import { AppRoutes } from "../../../app-routes";
import { Translation } from "../../../localization/dictionaries/keys";
import { useTranslation } from "../../contexts/localization-context/use-translation";
import { Svg } from "../svg/svg";

export const Footer = (_: {}, context: ContextMap) => {
  const t = useTranslation(context);

  return (
    <footer class="footer_box">
      <section class="footer-links_box">
        <ul>
          <li>
            <Link frameName="root" href={AppRoutes.home.$()}>
              <p>{t(Translation.Home)}</p>
            </Link>
          </li>
          <li>
            <Link frameName="root" href={AppRoutes.career.$()}>
              <p>{t(Translation.Career)}</p>
            </Link>
          </li>
          <li>
            <Link frameName="root" href={AppRoutes.projects.$()}>
              <p>{t(Translation.HobbyProjects)}</p>
            </Link>
          </li>
        </ul>
      </section>
      <section class="footer-external-links_box">
        <ul>
          <li>
            <a
              class="footer-gh-link_element"
              href="https://github.com/ncpa0cpl"
            >
              <Svg aria-label={t(Translation.MyGithub)} name="github" />
              <p>{t(Translation.MyGithub)}</p>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/szymon-bretner-2496061aa">
              <Svg aria-label={t(Translation.MyLinkedin)} name="linkedin" />
              <p>{t(Translation.MyLinkedin)}</p>
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};
