import type { ComponentApi } from "jsxte";
import { useCurrentLanguage } from "../../contexts/localization-context/use-current-language";
import { PopDown } from "../pop-down/pop-down";
import { Svg } from "../svg/svg";

export const LanguageSelector = (_: {}, context: ComponentApi) => {
  const currentLanguage = useCurrentLanguage(context);

  const renderLanguageSwitchButtons = () => {
    return (
      <>
        <a
          class="lang-change-link_element"
          is="anchor-extended"
          data-href=".?lang=pl"
          href="./?lang=pl"
        >
          <Svg
            aria-label="Zmień język na polski"
            class="lang-flag-circle_element"
            name="poland-flag-circle"
          />
          <p>PL</p>
        </a>
        <a
          class="lang-change-link_element"
          is="anchor-extended"
          data-href=".?lang=en"
          href="./?lang=en"
        >
          <Svg
            aria-label="Change language to English"
            class="lang-flag-circle_element"
            name="uk-flag-circle"
          />
          <p>EN</p>
        </a>
      </>
    );
  };

  return (
    <div class="lang-selector_box">
      <PopDown
        content={
          <div class="lang-selector-link-container_box">
            {renderLanguageSwitchButtons()}
          </div>
        }
      >
        <Svg
          class="lang-flag-circle_element"
          aria-label="Change language"
          name={
            currentLanguage === "en" ? "uk-flag-circle" : "poland-flag-circle"
          }
        />
      </PopDown>
      <div class="lang-selector-mobile-only_box">
        {renderLanguageSwitchButtons()}
      </div>
    </div>
  );
};
