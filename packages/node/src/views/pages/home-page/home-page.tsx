import type { ContextMap } from "jsxte";
import { Card } from "../../components/card/card";
import { LocalizationContextProvider } from "../../contexts/localization-context/provider";
import { useContent } from "../../contexts/localization-context/use-content";

export const HomePage = (_: {}, context: ContextMap): JSX.Element => {
  const content = useContent(context);

  return (
    <LocalizationContextProvider>
      <div class="main-page_box">
        <header class="main-page-banner_box">
          {content.html.get("banner")}
        </header>
        <main class="card-container_box">
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
        </main>
      </div>
    </LocalizationContextProvider>
  );
};
