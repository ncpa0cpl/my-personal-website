import type { ContextMap } from "jsxte";
import { useCurrentLanguage } from "../../contexts/localization-context/use-current-language";
import { PopDown } from "../pop-down/pop-down";
import { Svg } from "../svg/svg";

export const LanguageSelector = (_: {}, context: ContextMap) => {
  const currentLanguage = useCurrentLanguage(context);

  return (
    <div class="lang-selector_box">
      <PopDown
        content={
          <div class="lang-selector-link-container_box">
            <a
              class="lang-change-link_element"
              is="anchor-extended"
              data-href=".?lang=pl"
              href="./?lang=pl"
            >
              <Svg class="lang-flag-circle_element" name="poland-flag-circle" />
              <p>PL</p>
            </a>
            <a
              class="lang-change-link_element"
              is="anchor-extended"
              data-href=".?lang=en"
              href="./?lang=en"
            >
              <Svg class="lang-flag-circle_element" name="uk-flag-circle" />
              <p>EN</p>
            </a>
          </div>
        }
      >
        <span>
          <Svg
            class="lang-flag-circle_element"
            name={
              currentLanguage === "en" ? "uk-flag-circle" : "poland-flag-circle"
            }
          />
        </span>
      </PopDown>
    </div>
  );
};
