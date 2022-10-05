import type { ContextMap } from "jsxte";
import { Translation } from "../../../utilities/localization/dictionaries/keys";
import { Card } from "../../components/card/card";
import { LocalizationContextProvider } from "../../contexts/localization-context/provider";
import { useTranslation } from "../../contexts/localization-context/use-translation";

export const HomePage = (_: {}, context: ContextMap): JSX.Element => {
  const t = useTranslation(context);

  return (
    <LocalizationContextProvider>
      <div class="main-page_box">
        <div class="main-page-banner_box">
          <h1>{t(Translation.HomeBanner)}</h1>
        </div>
        <div class="card-container_box">
          <Card class="info_box">
            <span class="card-image-placeholder_element"></span>
            <h3>Card Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
              aliquet nisl nunc eget lorem.
            </p>
          </Card>
          <Card class="info_box">
            <span class="card-image-placeholder_element"></span>
            <h3>Card Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
              aliquet nisl nunc eget lorem.
            </p>
          </Card>
          <Card class="info_box">
            <span class="card-image-placeholder_element"></span>
            <h3>Card Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut aliquam aliquam, nunc nisl aliquet nisl, eget
              aliquet nisl nunc eget lorem.
            </p>
          </Card>
        </div>
      </div>
    </LocalizationContextProvider>
  );
};